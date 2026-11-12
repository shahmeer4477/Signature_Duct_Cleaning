import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function resolvePort(): number {
  const portArgIndex = process.argv.indexOf("--port");
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const val = parseInt(process.argv[portArgIndex + 1], 10);
    if (!isNaN(val)) return val;
  }
  if (process.env.PORT && process.env.PORT !== "8080") {
    const val = parseInt(process.env.PORT, 10);
    if (!isNaN(val)) return val;
  }
  return 3000;
}

function resolveHost(): string {
  const hostArgIndex = process.argv.indexOf("--host");
  if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
    return process.argv[hostArgIndex + 1];
  }
  return process.env.HOST || "0.0.0.0";
}

const PORT = resolvePort();
const HOST = resolveHost();

app.use(express.json());

// Immediate health check endpoints for container and runner monitoring
app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "healthy", uptime: process.uptime() });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "healthy", uptime: process.uptime() });
});

// SEO: Robots.txt endpoint (dynamically formats sitemap origin to match actual domain)
app.get("/robots.txt", (req, res) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.get("host") || "localhost:3000";
  const origin = `${protocol}://${host}`;

  const content = `# Robots.txt for Signature Duct Cleaning
User-agent: *
Allow: /

# Prevent indexing of internal backend API endpoints
Disallow: /api/
Disallow: /__aistudio_internal_control_plane/

# Sitemap location
Sitemap: ${origin}/sitemap.xml
`;
  res.type("text/plain").send(content);
});

// SEO: XML Sitemap endpoint (dynamically builds absolute URLs with runtime host)
app.get("/sitemap.xml", (req, res) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.get("host") || "localhost:3000";
  const origin = `${protocol}://${host}`;
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/#services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/#process</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/#faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/#privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${origin}/#terms-and-conditions</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
  res.type("application/xml").send(xml);
});

// Persistent storage path
const DATA_DIR = path.join(__dirname, "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf-8");
}

export interface BookingRecord {
  id: string;
  fullName: string;
  phone: string;
  customer_email: string;
  email?: string;
  address: {
    street: string;
    zip: string;
    city?: string;
    state?: string;
  };
  services: string[];
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

// Helpers to read/write bookings
function getBookings(): BookingRecord[] {
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw) as BookingRecord[];
  } catch (err) {
    console.error("Error reading bookings file:", err);
    return [];
  }
}

function saveBookings(bookings: BookingRecord[]): void {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing bookings file:", err);
    throw err;
  }
}

// Phone validator regex
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

// Email validator regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- API Endpoints ---

// POST /api/bookings - Create new appointment booking
app.post("/api/bookings", (req, res) => {
  try {
    const {
      fullName,
      phone,
      customer_email,
      email,
      address,
      services,
      preferredDate,
      preferredTime,
      notes,
    } = req.body;

    // Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({ error: "A valid full name is required." });
    }

    if (!phone || typeof phone !== "string" || !isValidPhone(phone)) {
      return res.status(400).json({ error: "A valid 10-digit phone number is required." });
    }

    const clientEmail = customer_email || email;
    if (!clientEmail || typeof clientEmail !== "string" || !isValidEmail(clientEmail.trim())) {
      return res.status(400).json({ error: "A valid customer email address is required." });
    }

    if (
      !address ||
      !address.street?.trim() ||
      !address.zip?.trim()
    ) {
      return res.status(400).json({
        error: "Complete service address (street address and ZIP code) is required.",
      });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ error: "Please select at least one service." });
    }

    if (!preferredDate) {
      return res.status(400).json({ error: "Preferred appointment date is required." });
    }

    // Verify date is not in the past
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      return res.status(400).json({ error: "Preferred appointment date cannot be in the past." });
    }

    if (!preferredTime || typeof preferredTime !== "string" || !preferredTime.trim()) {
      return res.status(400).json({ error: "Preferred appointment time is required." });
    }

    // Generate unique ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const bookingId = `SIG-${dateCode}-${randomSuffix}`;

    const newBooking: BookingRecord = {
      id: bookingId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      customer_email: clientEmail.trim(),
      email: clientEmail.trim(),
      address: {
        street: address.street.trim(),
        zip: address.zip.trim(),
      },
      services,
      preferredDate,
      preferredTime: preferredTime.trim(),
      notes: typeof notes === "string" ? notes.trim() : "",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    const bookings = getBookings();
    bookings.unshift(newBooking);
    saveBookings(bookings);

    return res.status(201).json({
      success: true,
      message: "Booking request successfully recorded.",
      booking: newBooking,
    });
  } catch (err: any) {
    console.error("Booking creation error:", err);
    return res.status(500).json({ error: "Internal server error processing booking." });
  }
});

// GET /api/bookings - Fetch all bookings for business management
app.get("/api/bookings", (_req, res) => {
  try {
    const bookings = getBookings();
    return res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

// PATCH /api/bookings/:id/status - Update booking status
app.patch("/api/bookings/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Booking not found." });
    }

    bookings[index].status = status;
    saveBookings(bookings);

    return res.json({ success: true, booking: bookings[index] });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update status." });
  }
});

// DELETE /api/bookings/:id - Delete booking
app.delete("/api/bookings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const bookings = getBookings();
    const filtered = bookings.filter((b) => b.id !== id);
    if (filtered.length === bookings.length) {
      return res.status(404).json({ error: "Booking not found." });
    }
    saveBookings(filtered);
    return res.json({ success: true, message: "Booking removed." });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete booking." });
  }
});

// Seed Initial Verified Request if empty (so business owner can test dashboard immediately)
const existing = getBookings();
if (existing.length === 0) {
  const seedBooking: BookingRecord = {
    id: `SIG-DEMO-7842`,
    fullName: "Arthur Sterling",
    phone: "(555) 234-5678",
    customer_email: "arthur.sterling@example.com",
    email: "arthur.sterling@example.com",
    address: {
      street: "740 Park Avenue, Apt 14B",
      zip: "10021",
    },
    services: ["Air Duct Cleaning", "HVAC Cleaning"],
    preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
    preferredTime: "10:30 AM",
    notes: "Central HVAC high-rise residence. Please confirm arrival window in advance.",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  saveBookings([seedBooking]);
}

// Direct favicon handler to guarantee instant high-performance delivery
app.get("/favicon.png", (_req, res) => {
  const faviconPath = path.join(__dirname, "public", "favicon.png");
  if (fs.existsSync(faviconPath)) {
    res.type("image/png").sendFile(faviconPath);
  } else {
    res.status(404).end();
  }
});

// Vite integration
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Serve public directory assets in dev mode
    const publicDir = path.join(__dirname, "public");
    app.use(express.static(publicDir));

    app.use(vite.middlewares);

    // Fallback for SPA routing in dev mode
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl.split("?")[0];
      if (
        url.startsWith("/api/") ||
        url.startsWith("/healthz") ||
        url.startsWith("/robots.txt") ||
        url.startsWith("/sitemap.xml") ||
        /\.[a-zA-Z0-9]+$/.test(url)
      ) {
        return next();
      }
      try {
        const indexPath = path.resolve(__dirname, "index.html");
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, "utf-8");
          template = await vite.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } else {
          next();
        }
      } catch (err: any) {
        vite.ssrFixStacktrace?.(err);
        next(err);
      }
    });
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      const url = req.originalUrl.split("?")[0];
      if (url.startsWith("/api/") || /\.[a-zA-Z0-9]+$/.test(url)) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled server error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  const server = app.listen(PORT, HOST, () => {
    console.log(`\n  Signature Duct Cleaning Server is ready`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/\n`);
  });

  process.on("SIGTERM", () => {
    server.close();
  });
  process.on("SIGINT", () => {
    server.close();
  });
}

startServer();

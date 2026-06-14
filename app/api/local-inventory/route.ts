import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { SITE_CONFIG } from "../../seo/constants";

export async function GET() {
  let itemEntries = "";
  const storeCode = process.env.LOCAL_STORE_CODE || "Physical shop (India)";

  try {
    const dumpPath = path.join(process.cwd(), "products_dump.json");
    if (fs.existsSync(dumpPath)) {
      const fileData = fs.readFileSync(dumpPath, "utf-8");
      const products: any[] = JSON.parse(fileData);

      products.forEach((prod) => {
        if (!prod.slug) return;

        const id = prod.id || prod.slug;
        const price = `${prod.regular_price || prod.price} INR`;
        const availability = prod.stock_status === "instock" ? "in_stock" : "out_of_stock";
        const quantity = prod.stock_quantity !== null && prod.stock_quantity !== undefined ? prod.stock_quantity : 5; // Default fallback quantity to 5 if manage stock is off

        itemEntries += `
    <item>
      <g:id>${id}</g:id>
      <g:store_code>${storeCode}</g:store_code>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:quantity>${quantity}</g:quantity>
    </item>`;
      });
    }
  } catch (error) {
    console.error("Error generating Local Inventory Feed:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${SITE_CONFIG.name} Local Inventory Feed</title>
    <link>${SITE_CONFIG.url}</link>
    <description>Local product inventory mapping for physical stores</description>${itemEntries}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

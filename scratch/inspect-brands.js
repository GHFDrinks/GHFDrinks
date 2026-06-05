const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
let key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  try {
    const env = fs.readFileSync(path.join(__dirname, "../.env.local"), "utf8");
    env.split("\n").forEach((line) => {
      const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
      if (match) {
        const k = match[1];
        const v = match[2].trim();
        if (k === "NEXT_PUBLIC_SUPABASE_URL") url = v;
        if (k === "SUPABASE_SERVICE_ROLE_KEY") key = v;
      }
    });
  } catch (e) {
    console.error("Failed to read .env.local", e);
  }
}

const supabase = createClient(url, key);

async function run() {
  const { data: brands, error } = await supabase.from("brands").select("id, slug, name");
  console.log("Brands count:", brands ? brands.length : 0);
  console.log("Brands list:", brands);
  if (error) console.error("Error:", error);
}

run();

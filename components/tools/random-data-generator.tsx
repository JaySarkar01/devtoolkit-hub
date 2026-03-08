"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const FIRST_NAMES = ["James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Charles","Karen","Emma","Liam","Noah","Olivia","Ava","Sophia","Mia","Lucas","Mason","Ethan"];
const LAST_NAMES = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson"];
const DOMAINS = ["gmail.com","yahoo.com","outlook.com","hotmail.com","proton.me","example.com","company.org"];
const STREETS = ["Main St","Oak Ave","Pine Rd","Maple Dr","Cedar Ln","Elm St","Washington Blvd","Park Ave","Lake Dr","Hill Rd"];
const CITIES = ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin"];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randNum(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generatePerson() {
  const first = rand(FIRST_NAMES), last = rand(LAST_NAMES);
  return {
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${randNum(1,99)}@${rand(DOMAINS)}`,
    phone: `+1 (${randNum(200,999)}) ${randNum(200,999)}-${randNum(1000,9999)}`,
    address: `${randNum(100,9999)} ${rand(STREETS)}, ${rand(CITIES)}`,
    age: randNum(18, 65),
    id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
  };
}

export default function RandomDataGenerator() {
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);

  const generate = () => {
    setData(Array.from({ length: count }, generatePerson));
    toast.success(`Generated ${count} records`);
  };

  const asJSON = JSON.stringify(data, null, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Settings</h3>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Number of Records</label>
          <Input type="number" value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))} min={1} max={50} />
        </div>
        <Button onClick={generate} className="gap-1.5 w-full"><RefreshCw className="w-4 h-4" /> Generate Data</Button>
        <p className="text-xs text-muted-foreground">Generates random: name, email, phone, address, age, UUID</p>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Generated Data (JSON)</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(asJSON); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
        </div>
        <pre className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-xs font-mono whitespace-pre-wrap">{data.length > 0 ? asJSON : "Click Generate to create random data"}</pre>
      </div>
    </div>
  );
}

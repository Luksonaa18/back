#!/usr/bin/env node
import axios from "axios";
import { program } from "commander";
import * as fs from "fs";
const FILE = "Budget.txt";
program
  .name("badri")
  .description("Badri Bank Robber for managing Badri Robs")
  .action(() => {
    console.log("badri");
  });

program
  .command("add <title> <amount>")
  .description("Add new expense")
  .action((title, amount) => {
    const id = Date.now();
    const entry = `id:${id} title:${title} amount:${amount}\n`;
    fs.appendFile(FILE, entry, (err) => {
      if (err) console.log("❌ Failed to add expense");
      else console.log("✅ Expense added!");
    });
  });
program.parse();
program
  .command("list")
  .description("List all expenses")
  .action(() => {
    if (!fs.existsSync(FILE)) {
      console.log("📭 No expenses found.");
      return;
    }

    const data = fs.readFileSync(FILE, "utf-8").trim();
    if (!data) {
      console.log("📭 No expenses found.");
    } else {
      console.log("📋 All Expenses:");
      console.log(data);
    }
  });

program
  .command("delete <id>")
  .description("Delete expense by ID")
  .action((id) => {
    try {
      if (!fs.existsSync(FILE)) {
        console.log("❌ No budget file found.");
        return;
      }

      const lines = fs.readFileSync(FILE, "utf-8").split("\n").filter(Boolean);
      console.log("Lines before delete:", lines);
      const filtered = lines.filter((line) => !line.includes(`id:${id}`));

      if (filtered.length === lines.length) {
        console.log("❌ No expense with that ID.");
      } else {
        fs.writeFileSync(FILE, filtered.join("\n") + "\n");
        console.log("🗑️ Deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  });

program.parse(process.argv);

// #!/usr/bin/env node
// import axios from "axios";
// import { program } from "commander";

// const API_KEY = "895284fb2d2c50a520ea537456963d9c";

// program
//   .name("weather-cli")
//   .description("CLI tool to fetch weather information for a city")
//   .version("1.0.0");

// program
//   .command("weather <cityName>")
//   .description("Get current temperature in Celsius for a city")
//   .action(async (cityName) => {
//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
//       );
//       const temp = response.data.main.temp;
//       console.log(`🌡️ The temperature in ${cityName} is ${temp}°C`);
//     } catch (error) {
//       console.error("❌ Could not fetch weather. Please check the city name.");
//     }
//   });

// program.parse(process.argv);

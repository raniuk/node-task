import fs from "node:fs";
import { parse } from "csv-parse";

const taskCsvPath = new URL("./tasksData.csv", import.meta.url);

fs.createReadStream(taskCsvPath)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (task) {
    const [title, description] = task;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  });

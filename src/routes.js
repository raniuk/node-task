import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { validateData } from "./utils/validate.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const tasks = database.findById("tasks", id);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      let errorMessages = validateData(title, description);

      if (errorMessages.length > 0) {
        return res.writeHead(400).end(JSON.stringify({ error: errorMessages }));
      }

      const user = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const { title, description } = req.body;

      let errorMessages = validateData(title, description);

      if (errorMessages.length > 0) {
        return res.writeHead(400).end(JSON.stringify({ error: errorMessages }));
      }

      const task = database.findById("tasks", id);
      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not exist" }));
      }

      const updated_at = new Date();

      database.update("tasks", id, { ...task, title, description, updated_at });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.findById("tasks", id);
      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not exist" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.findById("tasks", id);

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not exist" }));
      }

      const completed_at = new Date();

      database.update("tasks", id, { ...task, completed_at });

      return res.writeHead(204).end();
    },
  },
];

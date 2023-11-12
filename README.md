# node-task

Task manager

- CRUD
- Read CSV and insert into task data base

## Tools

| Tool   | Version |
| ------ | :-----: |
| Nodejs | v20.9.0 |
| pnpm   |  8.7.5  |
| npm    | 10.1.0  |
| yarn   | 1.22.19 |

## Run project

```
yarn dev
```

```
pnpm run dev
```

```
npm run dev
```

Read and insert into task database from CSV

```
node streams/readTasksCsv
```

## Curls

Get all taks

```bash
curl --request GET \
  --url http://localhost:3000/tasks \
  --header 'Content-Type: application/json'
```

Get one task (example id = a3026e63-539c-4991-9303-5a35cd548a25)

```bash
curl --request GET \
  --url http://localhost:3000/tasks/a3026e63-539c-4991-9303-5a35cd548a25 \
  --header 'Content-Type: application/json'
```

Create a task

```bash
curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Task 1",
	"description": "Description task 1"
    }'
```

Update task with id dinamic (example id = a3026e63-539c-4991-9303-5a35cd548a25)

```bash
curl --request PUT \
  --url http://localhost:3000/tasks/a3026e63-539c-4991-9303-5a35cd548a25 \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Task A",
	"description": "Description taks A"
    }'
```

Delete a task (example id = a3026e63-539c-4991-9303-5a35cd548a25)

```bash
curl --request DELETE \
  --url http://localhost:3000/tasks/fb51b464-0631-41b1-bd15-3ecbaeda5f5f \
  --header 'Content-Type: application/json'
```

Complete a task (example id = a3026e63-539c-4991-9303-5a35cd548a25)

```bash
curl --request PATCH \
  --url http://localhost:3000/tasks/a3026e63-539c-4991-9303-5a35cd548a25/complete \
  --header 'Content-Type: application/json'
```

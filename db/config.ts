import { column, defineDb, defineTable } from 'astro:db';

const Url = defineTable({
  columns: {
    id: column.number({
      primaryKey: true,
      autoIncrement: true
    }),
    url: column.text(),
    short_url: column.text({
      unique: true
    }),
    createdAt: column.date({
      default: new Date()
    }),
    userId: column.text({
      optional: true
    }),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Url
  }
});

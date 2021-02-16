import { list } from "@keystone-next/keystone/schema";
import { integer, relationship, select, text } from "@keystone-next/fields";

export const Post =  list({
  ui: {
    listView: { 
    initialColumns: ['title', 'body', 'author', 'status']   
    }
  },
  fields: {
    title: text({ isRequired: true }),
    body: text({ ui: {
      displayMode: 'textarea'
    }}),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" }, 
        { label: "Published", value: "PUBLISHED" } 
      ],
      defaultValue: 'DRAFT',
    }),
    author: text({ isRequired: true })
  }
})
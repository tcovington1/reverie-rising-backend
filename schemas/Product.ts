import { list } from "@keystone-next/keystone/schema";
import { integer, relationship, select, text } from "@keystone-next/fields";

export const Product =  list({
  // access:
  ui: {
    listView: { 
    initialColumns: ['name', 'description', 'photo', 'price', 'status']   
    }
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: {
      displayMode: 'textarea'
    }}),
    photo: relationship({ 
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      }
     }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" }, 
        { label: "Available", value: "AVAILABLE" }, 
        { label: "Unavailable", value: "UNAVAILABLE" }, 
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
      }
    }),
    price: integer(),
    // TODO photo
  }
})

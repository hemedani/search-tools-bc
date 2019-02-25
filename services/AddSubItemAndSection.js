const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");

// Init default const
const inDb = "Target Data";
const inItem = "Real Name";
const inSubItem = "Person Search Tool";
const inSection = "Person Search Tool";

const pageType = "SearchPage";
const hasPapulate = true;
const index = 0;

// End of Init default const

const subItem = {
  id: uuidv4(),
  title: inSubItem,
  pageType: pageType,
  section: [
    {
      id: uuidv4(),
      title: inSection,
      hasPapulate: hasPapulate,
      papulateItem: {
        papulate: ""
      },
      items: []
    }
  ]
};

const file = "./db/db.json";

let db = jsonfile.readFileSync(file);

let findedDb = _.find(db, { title: inDb });
let findedItem = _.find(findedDb.items, { title: inItem });

findedItem.subItem.splice(index, 0, subItem);

console.log("==================");
console.log("findedItem", JSON.stringify(findedItem.subItem, null, 2));
console.log("==================");

jsonfile.writeFileSync(file, db, { spaces: 2 });

const cheerio = require("cheerio");
const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");
const fs = require("fs");

// Init default const
const inDb = "Online Resources";
const inItem = "Public Records";
const inSubItem = "Public Records Resources";

// End of Init default const

// Html String to parse
const htm = fs.readFileSync("./frames/PublicRecordResource.html", "utf8");

const $ = cheerio.load(htm);

let section = [];

let panels = $(".panel");

panels.map((i, el) => {
  // this === el
  let sectionObj = {
    id: uuidv4(),
    hasPapulate: false,
    items: []
  };
  const panelTitle = $(el)
    .children(".panel-heading")
    .text()
    .trim();

  sectionObj.title = panelTitle;

  const aTags = $(el).find("a");

  aTags.map((i, atag) => {
    sectionObj.items.push({
      id: uuidv4(),
      name: $(atag)
        .text()
        .trim(),
      url: $(atag).attr("href"),
      target: $(atag).attr("target"),
      itemType: "link"
    });
  });
  section.push(sectionObj);
});

console.log("==================");
console.log("section", JSON.stringify(section, null, 2));
console.log("==================");

// End of Html String to parse

const file = "./db/db.json";

let db = jsonfile.readFileSync(file);

let findedDb = _.find(db, { title: inDb });
let findedItem = _.find(findedDb.items, { title: inItem });
let findedSubItem = _.find(findedItem.subItem, { title: inSubItem });

findedSubItem.section = section;

jsonfile.writeFileSync(file, db, { spaces: 2 });

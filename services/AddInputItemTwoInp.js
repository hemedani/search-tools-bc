const cheerio = require("cheerio");
const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");

const process = require("./utils/Process");

// Init default const
const inDb = "Target Data";
const inItem = "Facebook Profile";
const inSubItem = "Facebook Tool";
const inSection = "Facebook Profile Locate (Must be logged in)";

const isPapulate1 = false;
const isPapulate2 = false;
const isSubmitAll = false;

const breaking = false;
const lead = "Convert Location to FB ID (Google):";
let description = null;
// End of Init default const

// Html String to parse
const htm = `
<script type="text/javascript">
function dofbcity(city1, state1) {
window.open('https://www.google.com/search?hl=en&q=site%3Afacebook.com%2Fplaces%2FThings-to-do-in-' + city1 + '-' + state1, 'fbcitywindow');
}

                </script>
                      <form onSubmit="dofbcity(this.city1.value, this.state1.value); return false;">
                        <input type="text" name="city1" size="20" placeholder="U.S. City" />
                        <input type="text" name="state1" size="20" placeholder="U.S. State (Full)" />
                        <input type="submit" value="GO"/>
                        <br />
                    </form>
`;
const $ = cheerio.load(htm);

let scr = $('script[type="text/javascript"]')
  .contents()[0]
  .data.split("window.open('");

let formText = $("form")
  .text()
  .trim();

formText ? (description = formText) : "";

const value = $('input[type="submit"]').prop("value");

const place1 = $('input[type="text"]')[0].attribs.placeholder;
const place2 = $('input[type="text"]')[1].attribs.placeholder;

const inputText0 = $('input[type="text"]')[0].attribs.name;
const inputText1 = $('input[type="text"]')[1].attribs.name;

const submitUrl = process.processSubmitUrlsTwoInp(scr, inputText0, inputText1);

let inpItemObj = {
  id: uuidv4(),
  submitUrl,
  submitValue: value,
  itemType: "input",
  onSubmit: "submitUrl",
  inSection: inSection,
  inputItems: [
    {
      id: uuidv4(),
      name: inputText0,
      placeholder: place1,
      type: "text",
      isPapulate: isPapulate1,
      size: 13
    },
    {
      id: uuidv4(),
      name: inputText1,
      placeholder: place2,
      type: "text",
      isPapulate: isPapulate2,
      size: 11
    }
  ],
  isSubmitAll,
  breaking
};

lead ? (inpItemObj.lead = lead) : "";
description ? (inpItemObj.description = description) : "";

// End of Html String to parse

console.log("==================");
console.log("inpItemObj => ", JSON.stringify(inpItemObj, null, 2));
console.log("==================");

const file = "./db/db.json";

let db = jsonfile.readFileSync(file);

let findedDb = _.find(db, { title: inDb });
let findedItem = _.find(findedDb.items, { title: inItem });
let findedSubItem = _.find(findedItem.subItem, { title: inSubItem });
let findedSection = _.find(findedSubItem.section, { title: inSection });

findedSection.items.push(inpItemObj);

jsonfile.writeFileSync(file, db, { spaces: 2 });

const cheerio = require("cheerio");
const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");

// Init default const
const inDb = "Target Data";
const inItem = "Twitter Profile";
const inSubItem = "Twitter Tool";
const inSection = "Twitter Profile Search";

const isPapulate1 = true;
const isPapulate2 = false;
const isPapulate3 = false;
const isSubmitAll = false;

const breaking = true;
const lead = null;
let description = null;
// End of Init default const

// Html String to parse
const htm = `
<script type="text/javascript">
function dotw9(one, two, three) {
window.open('http://followerwonk.com/compare/' + one + '/' + two + '/' + three + '?op=fl', 'domainwindow');
}

                                  </script>
                                      </span>
                                <form onsubmit="dotw9(this.one.value, this.two.value, this.three.value); return false;">
                                  <span style="font-size: small">
                                    <input name="one" size="20" placeholder="Twitter Name 1" id="fb14" type="text" /><br />
                                  <input name="two" size="20" placeholder="Twitter Name 2" type="text" /><br />
                                    <input name="three" size="20" placeholder="Twitter Name 3" type="text" />
                                    <input type="submit" value="Go"/>
                                    Friends in common<br />
                                    <br />
                                    </span>
                                </form>
`;
const $ = cheerio.load(htm);

let scr = $('script[type="text/javascript"]')
  .contents()[0]
  .data.split("window.open('")[1]
  .split("'");

console.log("==================");
console.log("scr", scr);
console.log("==================");

let form = $("form");
let formText = form.text().trim();

formText ? (description = formText) : "";

const firstSecUrl = scr[0];
const urlSecondItem = scr[scr.length - 2];

scr.shift();
scr.shift();
scr.pop();
scr.pop();
scr.pop();

console.log("==================");
console.log("scr", scr);
console.log("==================");

const value = $('input[type="submit"]').prop("value");

const inputText0 = $('input[type="text"]')[0].attribs.placeholder;
const inputText1 = $('input[type="text"]')[1].attribs.placeholder;
const inputText2 = $('input[type="text"]')[2].attribs.placeholder;

const url = `${firstSecUrl}\`{${inputText0}}\`${scr[0] ? scr[0] : ""}\`{${inputText1}}\`${
  scr[2] ? scr[2] : ""
}\`{${inputText2}}\`${scr.length > 4 ? scr[scr.length - 1] : ""}`;

let inpItemObj = {
  id: uuidv4(),
  submitUrl: [
    {
      url: url,
      urlSecondItem: urlSecondItem
    }
  ],
  submitValue: value,
  itemType: "input",
  onSubmit: "submitUrl",
  inSection: inSection,
  inputItems: [
    {
      id: uuidv4(),
      name: inputText0,
      placeholder: inputText0,
      type: "text",
      isPapulate: isPapulate1,
      size: 7
    },
    {
      id: uuidv4(),
      name: inputText1,
      placeholder: inputText1,
      type: "text",
      isPapulate: isPapulate2,
      size: 7
    },
    {
      id: uuidv4(),
      name: inputText2,
      placeholder: inputText2,
      type: "text",
      isPapulate: isPapulate3,
      size: 7
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

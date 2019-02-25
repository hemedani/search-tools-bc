const cheerio = require("cheerio");
const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");

const process = require("./utils/Process");

// Init default const
const inDb = "Target Data";
const inItem = "Twitter Profile";
const inSubItem = "Twitter Tool";
const inSection = "Twitter Profile Search";

const isPapulate = true;
const isSubmitAll = false;

const breaking = true;
const lead = null;
let description = null;
// End of Init default const

// Html String to parse
const htm = `
<script type="text/javascript">
function dofb20(one, two) {
window.open('https://twitter.com/search?f=tweets&q=from%3A' + one + '%20to%3A' + two + '&src=typd', 'fb20window');
}

                                  </script>
                                      </span>
                                <form onsubmit="dofb20(this.one.value, this.two.value); return false;">
                                  <span style="font-size: small">
                                    <input name="one" size="15" placeholder="From..." id="fb20" type="text" />
                                  <input name="two" size="15" placeholder="To..." type="text" />
                                    <input type="submit" value="Go"/>
                                    Isolated Tweets<br />
                                    <br />
                                    </span>
                                </form>
`;
const $ = cheerio.load(htm);
let form = $("form");
let formText = form.text().trim();

formText ? (description = formText) : "";

const value = $('input[type="submit"]').prop("value");

let inputItems = [];
$('input[type="text"]').map((i, inp) => {
  inputItems.push({
    id: uuidv4(),
    name: inp.attribs.name,
    placeholder: inp.attribs.placeholder,
    type: "text"
  });
});

if (isPapulate) {
  inputItems.map((inp, i) => {
    if (i === 0) {
      inp.isPapulate = true;
    } else {
      inp.isPapulate = false;
    }
  });
}

const submitUrl = [
  {
    url: $(form).prop("action"),
    urlSecondItem: ""
  }
];
let inpItemObj = {
  id: uuidv4(),
  submitUrl,
  submitValue: value,
  itemType: "httpAction",
  target: $(form).prop("target"),
  method: $(form).prop("method"),
  onSubmit: "submitUrl",
  inSection: inSection,
  inputItems,
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

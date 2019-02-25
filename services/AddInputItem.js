const cheerio = require("cheerio");
const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");
const _ = require("lodash");

const process = require("./utils/Process");

// Init default const
const inDb = "Target Data";
const inItem = "Telephone Number";
const inSubItem = "Telephone Search Tool";
const inSection = "USA Telephone Search Tool";

const isPapulate = false;
const isSubmitAll = false;

const breaking = true;
const lead = null;
let description = null;
const setTimeOutForSub = true;
const onSubmit = "submitUrl";
const afterSubmit = "submitUrl";
// End of Init default const

// Html String to parse
const htm = `
<script type="text/javascript">
function dopall3(pall3) {
window.open('https://inteltechniques.com/osint/iframe/telephone.1994.php?pall3=' + pall3, 'frame1');
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.1995.php?pall3=' + pall3, 'frame2');},1000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.1996.php?pall3=' + pall3, 'frame3');},2000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.1997.php?pall3=' + pall3, 'frame4');},3000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.1998.php?pall3=' + pall3, 'frame5');},4000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2001.php?pall3=' + pall3, 'frame6');},5000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2002.php?pall3=' + pall3, 'frame7');},6000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2003.php?pall3=' + pall3, 'frame8');},7000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2007.php?pall3=' + pall3, 'frame9');},8000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2008.php?pall3=' + pall3, 'frame10');},9000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2013.php?pall3=' + pall3, 'frame11');},10000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.2014.php?pall3=' + pall3, 'frame12');},11000);
setTimeout(function(){window.open('https://inteltechniques.com/osint/iframe/telephone.america.php?pall3=' + pall3, 'frame13');},12000);

}
  </script>		
		
		<form onsubmit="dopall3(this.pall3.value); return false;">
        <input type="text" id="pall3" name="pall3" size="20" placeholder="6185551212" />
        <input type="submit" style="width:140px" value="Historical Phonebook" />      
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

let inputItems = [];
let val = [];
$('input[type="text"]').map((i, inp) => {
  inputItems.push({
    id: uuidv4(),
    name: inp.attribs.name,
    placeholder: inp.attribs.placeholder,
    type: "text"
  });
  val.push(inp.attribs.name);
});

const submitUrl = process.processSubmitUrls(scr, val, setTimeOutForSub);

if (isPapulate) {
  inputItems.map((inp, i) => {
    if (i === 0) {
      inp.isPapulate = true;
    } else {
      inp.isPapulate = false;
    }
  });
}

let inpItemObj = {
  id: uuidv4(),
  submitUrl,
  submitValue: value,
  itemType: "input",
  onSubmit,
  inSection: inSection,
  inputItems,
  isSubmitAll,
  breaking
};

if (onSubmit === "httpGet") {
  inpItemObj.afterSubmit = afterSubmit;
  inpItemObj.httpUrl = "https://inteltechniques.com/osint/iframe/reverse.liveleak.php?videoid=`{LLVideoID}`";
}

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

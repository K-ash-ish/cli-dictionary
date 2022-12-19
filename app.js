import fs from "fs";
import prompt from "prompt";

function addWords(data) {
  const fileData = JSON.parse(fs.readFileSync("dictionary.txt").toString());
  console.log(fileData);
  console.log(data);
  fileData.push(data);
  fs.writeFileSync(
    "dictionary.txt",
    JSON.stringify(fileData, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Word added to Dictionary");
    }
  );
}
function getMeaning(words) {
  fs.readFile("dictionary.txt", function (err, data) {
    if (err) {
      console.log(err);
    }
    let datas = JSON.parse(data.toString());
    let match = 0;
    datas.map((res) => {
      if (res.hasOwnProperty(words)) {
        match = 1;
        console.log("Meaning of word " + words + " : " + res[words]);
      }
    });
    if (match < 1) {
      console.log("Not Found");
    }
  });
}
function deleteWord(words) {
  fs.readFile("dictionary.txt", function (err, data) {
    if (err) {
      console.log(err);
    }
    let datas = JSON.parse(data.toString());
    let match = 0;
    let newDic = datas.filter((res) => {
      match = 1;
      return !res.hasOwnProperty(words);
    });
    fs.writeFileSync(
      "dictionary.txt",
      JSON.stringify(newDic, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Word added to Dictionary");
      }
    );
    if (match < 1) {
      console.log("Not Found");
    }
  });
}
prompt.start();
console.log("What you want to do 1. get 2. add?");
console.log("To get meaning enter word.");
console.log(`To add word enter data in { "key": "value"}`);
prompt.get(["command"], function (err, result) {
  if (result.command === "get") {
    prompt.get(["Get"], function (err, res) {
      getMeaning(res.Get);
    });
  }
  if (result.command === "add") {
    prompt.get(["Add"], function (err, res) {
      let add = JSON.parse(res.Add);
      addWords(add);
    });
  }
  //   if (result.command === "delete"){
  //     deleteWord("about");
  //   }
});

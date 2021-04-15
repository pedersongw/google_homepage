function mix(s1, s2) {
  let regex = /[a-z]/g;
  let arr1 = [];
  let arr2 = [];
  let newArr1 = [];
  let newArr2 = [];
if (s1) {
  arr1 = s1.match(regex);
  for (let i = 0; i < arr1.length; i++) {
    let regex2 = new RegExp(arr1[i], "g");
    let matched = s1.match(regex2);
    if (matched.length > 1){
    newArr1.push(arr1[i]);
    }
  }
  newArr1 = newArr1.sort().reduce(function (a,b) {
    if (a[a.length - 1] == b) {
      return a + b;
    } else {
      return a + " " + b;
    }
  }).split(" ").map(e => "1:" + e);
}
if (s2) {
  arr2 = s2.match(regex);
  for (let i = 0; i < arr2.length; i++) {
    let regex2 = new RegExp(arr2[i], "g");
    let matched = s2.match(regex2);
    if (matched.length > 1){
    newArr2.push(arr2[i]);
    }
  }
  newArr2 = newArr2.sort().reduce(function (a,b) {
    if (a[a.length - 1] == b) {
      return a + b;
    } else {
      return a + " " + b;
    }
  }).split(" ").map(e => "2:" + e);
}
let combined =  newArr1.concat(newArr2).sort(function (a,b) {
    if (a[a.length -1] < b[b.length -1]) {
      return -1;
    } else if (b[b.length -1] < a[a.length -1]) {
      return 1;
    } else {
      return 0;
    }
}).sort(function(a, b) {
  if (a.length < b.length) {
    return 1;
} else if (b.length < a.length) {
  return -1;
} else {
  return 0;
}
})

  let final = [];
  final.push(combined[0]);
  for (let i = 1; i < combined.length; i++) {
     let sliced = combined[i].slice(2);
     if (sliced == final[final.length - 1].slice(2)) {
       final[final.length - 1] = '=:' + final[final.length - 1].slice(2);
     } else {
       final.push(combined[i])
     }
  }
  for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < final.length; j++) {
      if (final[j][2] == final[i][2]) {
        if (final[j].length < final[i].length) {
          final[j] = ""
        } else if (final[i].length < final[j].length) {
          final[i] = "";
        }
      }
  }
}
final = final.filter(e => e !== "");
let held = [[final[0]]];
let counter = 0;
for (let i = 1; i < final.length; i++) {
  if (final[i].length == held[counter][0].length) {
    held[counter].push(final[i]);
  } else if (final[i].length !== held[counter][0].length) {
    counter++;
    held[counter] = [final[i]];
  }
}
for (let i = 0; i < held.length; i++) {
  held[i] = held[i].sort();
}
let separated = [];
for (let i = 0; i < held.length; i++) {
  separated.push([held[i][0]])
  for(let j = 1; j < held[i].length; j++) {
    if (held[i][j][0] == separated[separated.length -1][0][0]) {
      separated[separated.length -1].push(held[i][j]);
    } else {
      separated.push([held[i][j]])
    }
  }
}
for (let i = 0; i < separated.length; i++) {
  if (separated[i].length > 1) {
    separated[i] = separated[i].sort(function (a,b) {
      return a[2] - b[2];
    })
  }
}
for (let i = 0; i < separated.length; i++) {
  if (separated[i].length > 1) {
    separated[i] = separated[i].reduce(function (a,b) {
      return [a + "/" + b];
    })
  }
}
return separated.join("/");
}
console.log(mix("looping is fun but dangerous", "less dangerous than coding"));
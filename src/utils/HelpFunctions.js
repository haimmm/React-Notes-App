import localforage from "localforage";

export const getFormattedDate = (date) => {
    const months = 
        ["Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"]
    const month   = months[date.getMonth()];
    const day     = date.getDate();
    const hour    = date.getHours()
    const minute  = date.getMinutes();
    const format  = hour < 13 ? "AM" : "PM"; 

    return  `${month} ${day}th ${hour}:${minute} ${format}`
}

export const getNotesFromDB = () => {
    const notes = new Array(2).fill([]);
    return new Promise((resolve, reject) => {
        localforage.iterate(function(value, key, iterationNumber) {
            if(key === "liveNotes") notes[0] = value;
            else if(key === "deletedNotes")notes[1] = value;
        }).then(function() {
          resolve (notes);
        }).catch(function(err) {
          reject(err);
        });
    });
}

export const getNextId = () => {
    return new Promise((resolve, reject) => {
        localforage.getItem('id').then(value => {
            resolve(value);
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    });
}

export const updateDB = (keys, values) => {
    keys.forEach((key, i) => {
        localforage.setItem(key, values[i])
        .catch(function(err) {
            console.log(err);
        });
    });
}

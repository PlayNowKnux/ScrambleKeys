//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

var all_instances = [];

var ScrambleKeyboard = function(el, func) {
    this.keys = "1,2,3,4,5,6,7,8,9,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m,spc,bksp,caps,done".split(",");
    this.isShifted = false;
    this.arrplace = all_instances.length;
    console.log(this.keys.length)
    this.el = el;
    this.createKey = function(key) {
        return `<button class="scramblekey" onclick="all_instances[${this.arrplace}].fire('${key == "CAPS" ? "caps" : key}')">${key}</button>`;
    }
    this.shiftKey = function() {
        this.isShifted = !this.isShifted;
        var newKeys = [];
        for (var i of this.keys) {
            switch(i) {
                case "spc":
                    newKeys.push("spc");
                    break;
                case "bksp":
                    newKeys.push("bksp");
                    break;
                case "done":
                    newKeys.push("done");
                    break;
                default:
                    if (this.isShifted) {
                        newKeys.push(i.toUpperCase());
                    } else {
                        newKeys.push(i.toLowerCase());
                    }
            }
        }
        this.keys = newKeys;
    }
    this.fire = function(k) {
        if (k.toLowerCase() == "caps") {
            this.shiftKey();
        }
        func(k);
        this.keys = shuffle(this.keys);
        this.place();
    }
    this.place = function() {
        this.el.innerHTML = "";
        for (let i = 0; i < this.keys.length; i++) {
            this.el.innerHTML += this.createKey(this.keys[i])
            if ((i + 1) % 13 == 0 && i) {
                this.el.innerHTML += "<br>"
            }
        }
        el = this.el;
    }
    this.place();
}
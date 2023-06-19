
UserName=''
sessionKey=String.fromCharCode(Math.round(Math.random()*15000))+Math.round(Math.random()*99999)+String.fromCharCode(Math.round(Math.random()*15000));
DatatoSend=[]

function Start() {
  UserName=$('#nameIN').val();
  if (UserName=='') {
    swal({
      title: "Error",
      text: "please insert any name",
      icon: "error",
      button: "try again",
    });
    return false;
  }
  $('#info').fadeOut(200);
  $('#inputs').fadeIn(500);
}


function AddData() {
  const Text=$('#textIN').val();
  const ph = document.getElementById('inputs');
  let index=document.getElementById('index').innerHTML
  index=parseInt(index.replace('Text number : ',''));
  words=Text.split(" ")
  words=words.filter((w)=>{return w!=' '&& w!=''})
  isAnti=index<=5?true:false;

  if (words.length<3) {
    swal({
      title: "Error",
      text: "please try to write more then 2 words",
      icon: "error",
      button: "try again",
    });
    return false
  }
  const packet={
    UserName:UserName,
    IsAnti:isAnti,
    Text:Text,
    Words:words,
    index:index,
    Key:sessionKey,

  }
  console.log(packet);
  DatatoSend.push(packet);
  let str='';
  index++;
  if (index<=5) {
     str = `<p>Write antisemitic texts <br>(English Only)</p>
    <p id="index">Text number : ${index}</p>
    <textarea maxlength="254" draggable="false" name="textIN" id="textIN" cols="30"
        rows="4" placeholder="your text here..."></textarea>
    <button onclick="AddData()" class="btn-long btn-shadow">Submit</button>`
  }else if(index>5 && index<=10){
    str = `<p>Write <strong>NON</strong> antisemitic texts <br>(English Only)</p>
    <p id="index">Text number : ${index}</p>
    <textarea maxlength="254" draggable="false" name="textIN" id="textIN" cols="30"
        rows="4" placeholder="your text here..."></textarea>
    <button onclick="AddData()" class="btn-long btn-shadow">Submit</button>`
  }
  else if (index==11) {
    // $('#inputs').fadeOut(250);
    swal({
      title: "Thank you",
      text: "thank you for the session\nfor new session refresh the page.",
      icon: "success",
      button: "Finish",
    });
    InsertTo('Data/'+UserName+'||'+packet.Key,DatatoSend,true);
    str=`<button class="btn-long" onclick="reload()">Again</button>`
  }
  ph.innerHTML=str;
   

}
function reload() {
  index=1;
  sessionKey=String.fromCharCode(Math.round(Math.random()*15000))+Math.round(Math.random()*99999)+String.fromCharCode(Math.round(Math.random()*15000));
  DatatoSend=[];
  let str = `<p>Write antisemitic texts <br>(English Only)</p>
  <p id="index">Text number : ${index}</p>
  <textarea maxlength="254" draggable="false" name="textIN" id="textIN" cols="30"
      rows="4" placeholder="your text here..."></textarea>
  <button onclick="AddData()" class="btn-long btn-shadow">Submit</button>`;
  document.getElementById('inputs').innerHTML=str;
  $('#inputs').fadeIn(200);
}



// ------------------ Data Base Mange ------------------ \\
const InsertTo = (ref, object,ride=false) => {
  if (ride) {
    firebase.database().ref(ref).set(object);

  }
  else{
    firebase.database().ref(ref).push('stam').set(object);

  }
};

const ReadFrom = (ref) => {
  
  const collection = firebase.database().ref(ref);
  collection.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};



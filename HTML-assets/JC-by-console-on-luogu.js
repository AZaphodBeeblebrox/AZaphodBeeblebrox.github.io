var code = "fetch(\"\", {})\n";
function generateCode() {
    var operationType = document.getElementById("operationType").value;
    
    switch (operationType) {
        case "benben":
            var benbenContent = document.getElementById("benbenContent").value;
            code += `.then(data => {
  return fetch("https://www.luogu.com.cn/api/feed/postBenben", {
    headers: [
      ["content-type", "application/json"],
      ["referer", "https://www.luogu.com.cn/"],
      ["x-csrf-token", document.querySelector("meta[name=csrf-token]").content],
    ],
    body: JSON.stringify({
      content: "${benbenContent}",
    }),
    method: "POST",
  });
})\n`;
            break;
            
        case "chat":
            var chatUid = document.getElementById("chatUid").value;
            var chatContent = document.getElementById("chatContent").value;
            code += `.then(data => {
  return fetch("https://www.luogu.com.cn/api/chat/new", {
    headers: [
      ["content-type", "application/json"],
      ["referer", "https://www.luogu.com.cn/"],
      ["x-csrf-token", document.querySelector("meta[name=csrf-token]").content],
    ],
    body: JSON.stringify({
      user: ${chatUid},
      content: "${chatContent}",
    }),
    method: "POST",
  });
})\n`;
            break;
            
        case "follow":
            var followUid = document.getElementById("followUid").value;
            var relationship = document.getElementById("relationship").value;
            code += `.then(data => {
  return fetch("https://www.luogu.com.cn/api/user/updateRelationShip", {
    headers: [
      ["content-type", "application/json"],
      ["referer", "https://www.luogu.com.cn/"],
      ["x-csrf-token", document.querySelector("meta[name=csrf-token]").content],
    ],
    body: JSON.stringify({
      uid: ${followUid},
      relationship: ${relationship}
    }),
    method: "POST",
  });
})\n`;
            break;
            
        case "slogan":
            var newSlogan = document.getElementById("newSlogan").value;
            code += `.then(data => {
  return fetch("https://www.luogu.com.cn/api/user/updateSlogan", {
    headers: [
      ["content-type", "application/json"],
      ["referer", "https://www.luogu.com.cn/"],
      ["x-csrf-token", document.querySelector("meta[name=csrf-token]").content],
    ],
    body: JSON.stringify({
      slogan: "${newSlogan}"
    }),
    method: "POST",
  });
})\n`;
            break;
    }
    
    document.getElementById("generatedCode").innerText = code;
}

function showForm() {
    document.getElementById("addButton").style.display = "none";
    document.getElementById("operationForm").style.display = "block";
}

function hideForm() {
    document.getElementById("addButton").style.display = "block";
    document.getElementById("operationForm").style.display = "none";
    document.getElementById("operationType").selectedIndex = 0;
    document.getElementById("benbenInputs").style.display = "none";
    document.getElementById("chatInputs").style.display = "none";
    document.getElementById("followInputs").style.display = "none";
    document.getElementById("sloganInputs").style.display = "none";
}

function finish(callback,args) {
    code += ";"; 
    document.getElementById("addButton").style.display = "none";
    document.getElementById("endButton").style.display = "none";
    document.getElementById("operationForm").style.display = "none";
    document.getElementById("operationType").selectedIndex = 0;
    document.getElementById("benbenInputs").style.display = "none";
    document.getElementById("chatInputs").style.display = "none";
    document.getElementById("followInputs").style.display = "none";
    document.getElementById("sloganInputs").style.display = "none";
    generateCode();
    document.getElementById("copyCode").style.display = "block";
    setTimeout(function() {
        alert('Generation Done!');
        }, 250);
    }

function showInputs() {
    var operationType = document.getElementById("operationType").value;
    
    switch (operationType) {
        case "benben":
            document.getElementById("benbenInputs").style.display = "block";
            document.getElementById("chatInputs").style.display = "none";
            document.getElementById("followInputs").style.display = "none";
            document.getElementById("sloganInputs").style.display = "none";
            break;
            
        case "chat":
            document.getElementById("benbenInputs").style.display = "none";
            document.getElementById("chatInputs").style.display = "block";
            document.getElementById("followInputs").style.display = "none";
            document.getElementById("sloganInputs").style.display = "none";
            break;
            
        case "follow":
            document.getElementById("benbenInputs").style.display = "none";
            document.getElementById("chatInputs").style.display = "none";
            document.getElementById("followInputs").style.display = "block";
            document.getElementById("sloganInputs").style.display = "none";
            break;
            
        case "slogan":
            document.getElementById("benbenInputs").style.display = "none";
            document.getElementById("chatInputs").style.display = "none";
            document.getElementById("followInputs").style.display = "none";
            document.getElementById("sloganInputs").style.display = "block";
            break;
    }
}

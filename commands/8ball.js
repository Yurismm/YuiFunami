module.exports = {
    name: '8ball',
    description: 'Works like the 8ball toy, predicts your future',
    async execute(message,args){
        message.channel.send(doMagic8BallVoodoo());
    }
}
module.exports.config = {
    type: 'fun'
}

function doMagic8BallVoodoo() {
    var rand = ['yes', 'no', "ask again later after james charles teaches me some makeup tips",'lol xd no', 'ofc not jake pauler', 'maaaaaaybe', 'never lol', 'yea sure u furry'];
  
    return rand[Math.floor(Math.random()*rand.length)];
  }
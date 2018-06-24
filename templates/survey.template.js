const keys = require('../config/keys');

module.exports = survey => {
  const { title, body, subject, id } = survey;
  return `
    <html>
    <head>
    <style>
        .container{
          width:300px;
          min-height: 100px;
          border: 1px solid #ccc;
          margin:46px auto;
          text-align: center;
        }
        
        button{
          min-width:40px;
          color: white;
          margin: 5px auto;
          padding: 5px 16px;
        }
        
        .green button{
          background-color: green;
        }
        
        .green button:hover{
          background-color: lightgreen;
          color: green;
          
        }
        .red button{
          background-color: #ffaaaa;
        }
        
        .red button:hover{
          background-color: red;
        }
    </style>
    </head>
    <body>
      <div class="container">
        <h2>${title}</h2>
        <p>${body}</p>
        <div class="btn green">
          <button>Yes</button>
        </div>
        <div class="btn red">
          <button>No</button>
        </div>
        <div>
        <a href="${keys.sgRedirectDomain}/api/surveys/${id}/yes">
        Yes</a>
        <a href="${keys.sgRedirectDomain}/api/surveys/${id}/no">
        No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
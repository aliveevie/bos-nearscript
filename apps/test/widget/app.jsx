const [value, setValue] = useState("");
const [active, setActive] = useState(false);
const [data, setData] = useState([]);
const [source, setSource] = useState('');
const [showBuilder, setShowBuilder] = useState(false);
const builder = "https://i.ibb.co/fp8wDPB/builder.gif";
const success = 'https://i.ibb.co/FHBZLBq/success.gif';
const deploy = 'https://i.ibb.co/dD232QF/deploy.gif';
const erro = 'https://i.ibb.co/jRMcyCV/error.gif';


function handleValueChange(e) {
  setValue(e.target.value);
};


const coding = {
  background: "black",
  color: "white",
  fontFamily: "monospace",
  border: "none",
  padding: "10px",
  width: "60%",
  height: "400px",
  resize: "none",
  outline: "none",
  overflow: "auto",
  lineHeight: "1.5",
  "::placeholder": {
    color: "rgba(255, 255, 255, 0.5)",
  },
};

const NumberLine = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 10;
    width: 40px;
    padding: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-family: monospace;
    pointer-events: none;
    user-select: none;
    margin-left: 5px;
`;

const Buttons = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      button.disabled {
        opacity: 0.5;
      }
      
      button.disabled:hover {
        background-color: inherit; /* Override hover background */
        color: inherit; /* Override hover color */
        cursor: not-allowed;
      }
      width: 60%;
`;

const Output = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #1e1e1e;
  padding: 10px;
  color: white;
  width: 60%;

 h3 {
  margin: 0 0 10px;
  font-size: 10px;
  color: white;
}

.console {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2e2e2e;
  padding: 20px;
  font-size: medium;
  width: 100%;
}

.console div {
  margin-bottom: 10px;
}

.console p {
  margin: 0;
}

.console strong {
  color: #9cdcfe;
}

.console a {
  color: #4ec9b0;
  text-decoration: none;
}

.builder-container {
  float: right; /* or use display: inline-block; */
  margin-left: 20px; /* adjust as needed */
}
`;


const handleKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const startPos = e.target.selectionStart;
    const endPos = e.target.selectionEnd;
    setValue((prevValue) => {
      const newValue =
        prevValue.substring(0, startPos) + "\n" + prevValue.substring(endPos);
      return newValue;
    });
    setTimeout(() => {
      const textarea = e.target;
      textarea.setSelectionRange(startPos + 1, startPos + 1);
    }, 0);
  }
};

const handleSave = () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: value // Assuming value holds the data you want to send
  };

  

  const response = fetch('http://localhost:3001/user', requestOptions);

  setData(response.body);

  if(response.body=="Contract Build successfully"){
      
  }

  
};


return (
  <div>

    <Buttons>
    <button onClick={handleSave} type='submit'>Build</button>
      <button
        onClick={handleRunFile}
        type='submit'
        disabled={!active}
        className={active ? '' : 'disabled'}
      >
        {active ? 'Deploy' : 'Deploy (Disabled)'}
      </button>
   
    </Buttons>
    <NumberLine>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index}>{index + 1}</div>
      ))}
    </NumberLine>
    <textarea
      style={coding}
      value={value}
      onChange={handleValueChange}
      // placeholder="Enter your code here..."
      //  onKeyDown={handleKey}
    />
     <Output className="output" >
      <h3>Output</h3>
      <div className='console'>
        {data.map((data, key) => (
          <div key={key}>
          <p><strong>Account ID:</strong> {data.Account_id} <button onClick={() => copyToClipboard(data.Account_id)}>Copy</button></p>
          <p><strong>Contract Name:</strong> {data.ContractName} <button onClick={() => copyToClipboard(data.ContractName)}>Copy</button></p>
          <p><strong>Transaction ID:</strong> {data.Trasaction_id} <button onClick={() => copyToClipboard(data.Trasaction_id)}>Copy</button></p>
          <p><strong>Transaction Info:</strong> <a href={data.Trasaction_info} target='_blank'>{data.Trasaction_info}</a> <button onClick={() => copyToClipboard(data.Trasaction_info)}>Copy</button></p>
          </div>
        ))}
      </div>
    </Output>
  </div>
);

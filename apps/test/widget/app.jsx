const [value, setValue] = useState("");

function handleValueChange(e) {
  setValue(e.target.value);
}

const coding = {
  background: "black",
  color: "white",
  fontFamily: "monospace",
  border: "none",
  padding: "10px",
  width: "100%",
  height: "800px",
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
    bottom: 0;
    width: 40px;
    padding: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-family: monospace;
    pointer-events: none;
    user-select: none;
    margin-left: 5px;
`;

const [ent, setEnt] = useState("");

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

  const data = fetch('http://localhost:3001/user', requestOptions);
  console.log(data.body)
    
   
};




return (
  <div>
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
    <button
    onClick={handleSave}
    ></button>
  </div>
);

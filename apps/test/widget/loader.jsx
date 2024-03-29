const Container=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* This ensures the container takes up the full height of the viewport */


.text{
    display: block;
    text-align: center;
}

`;

function Builder({ source, text }) {
    return (
        <Container>
            <img src={source}  />
            <p>{text}</p>
        </Container>
    );
}

return { Builder }
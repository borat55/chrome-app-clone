import { useEffect, useState } from "react";
import styled from "styled-components";

const Quote = styled.p`
  text-align: center;
  font-size: 25px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 20px;
  color: white;
  -webkit-text-stroke: 0.5px #f5f5f5;
`;

interface IQuote {
  slip: {
    advice: "string";
    id: "number";
  };
}

function QuoteForToday() {
  const API = `https://api.adviceslip.com/advice`;
  const [quote, setQuote] = useState<IQuote>();
  useEffect(() => {
    const quote = async () => {
      const json = await (await fetch(API)).json();
      setQuote(json);
    };
    quote();
  }, [API]);

  return <Quote>{quote?.slip?.advice}</Quote>;
}

export default QuoteForToday;

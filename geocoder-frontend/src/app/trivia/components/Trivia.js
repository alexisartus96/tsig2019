import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Line } from 'rc-progress';
import correctSound from '../assets/correct-sound.mp3'; 
import wrongSound from '../assets/wrong-sound.mp3'; 
import {
  Box, Title, SubBox, Option, Question, Triangle, TitleBox, BoxOption, BoxQuestion, CorrectText,
  Correct, ProgressBox, ProgressSubBox, TBox, PBox, ProgressSubBoxM,
} from '../styles/trivia';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
      correct: 0,
      total: 0,
      loading: true,
      feedbackColor: '#2AAA36',
      opacity: 1,
      showCorrect: 'hidden',
      correctColor: '',
      backColor: [null, null, null, null],
    };
    this.audioC = new Audio(correctSound);
    this.audioW = new Audio(wrongSound);
    this.optionClicked = this.optionClicked.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }


  getQuestions() {
    this.setState({ loading: true });
    axios.get(process.env.REACT_APP_CORS + process.env.REACT_APP_API_QUESTIONS)
      .then(({ data }) => {
        this.setState(
          {
            questions: data,
            loading: false,
          },
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.response) { // If a response has been received from the server
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }


  optionClicked(op, correctOp) {
    const {
      backColor, showCorrect,
    } = this.state;
    if (showCorrect === 'hidden') {
      let opN = 0;
      let correctOpN = 0;
      switch (op) {
        case 'A': opN = 0;
          break;
        case 'B': opN = 1;
          break;
        case 'C': opN = 2;
          break;
        case 'D': opN = 3;
          break;
        default:
          break;
      }

      switch (correctOp) {
        case 'A': correctOpN = 0;
          break;
        case 'B': correctOpN = 1;
          break;
        case 'C': correctOpN = 2;
          break;
        case 'D': correctOpN = 3;
          break;
        default:
          break;
      }

      const newBackColors = backColor.slice();
      if (op === correctOp) {
        newBackColors[opN] = '#2AAA36';
        this.setState({
          correct: this.state.correct + 1,
          textCorrect: 'CORRECTO',
          correctColor: '#2AAA36',
        });
        this.audioC.play();
      } else {
        newBackColors[opN] = '#FD1F01';
        newBackColors[correctOpN] = '#2AAA36';
        this.setState({
          textCorrect: 'INCORRECTO',
          correctColor: '#FD1F01',
        });
        this.audioW.play();        
      }
      this.setState({
        backColor: newBackColors,
        opacity: 0.2,
        showCorrect: 'visible',
        total: this.state.total + 1,
      });

      sleep(100).then(() => {
        if (this.state.total >= 1) {
          if ((this.state.correct / this.state.total) < 0.25) {
            this.setState({ feedbackColor: '#FD1F01' });
          } else if ((this.state.correct / this.state.total) < 0.5) {
            this.setState({ feedbackColor: '#ff7b00' });
          } else if ((this.state.correct / this.state.total) < 0.75) {
            this.setState({ feedbackColor: '#ffce00' });
          } else {
            this.setState({ feedbackColor: '#2AAA36' });
          }
        }
      });
      sleep(2500).then(() => {
        this.resetBackColor();
        this.setState({
          index: this.state.index + 1,
        });
      });
    }
  }

  resetBackColor() {
    const { index } = this.state;
    this.setState({
      backColor: [null, null, null, null],
      answered: false,
      showCorrect: 'hidden',
      opacity: 1,
    });
    if (index === 5) {
      this.getQuestions();
      this.setState({
        index: -1,
      });
    }
  }

  render() {
    const {
      questions, index, loading, showCorrect, opacity, textCorrect, correctColor, backColor,
      total, correct,
    } = this.state;
    const actualQ = questions[index];

    if (!loading) {
      return (
        <Box>
          <TBox>
            <TitleBox>
              <Title>¿Cuánto conocés?</Title>
              <Triangle />
            </TitleBox>
            <PBox>
              <ProgressBox>
                <ProgressSubBox total={total}>
                  <Line percent={correct / total * 100} strokeWidth="4" strokeColor={this.state.feedbackColor} />
                </ProgressSubBox>
              </ProgressBox>
              <Correct>
Respuestas correctas:
                {correct}
              </Correct>
              <Correct>
Total:
                {total}
              </Correct>
            </PBox>
          </TBox>


          <SubBox>
            <BoxQuestion>
              <Question opacity={opacity}>{actualQ.question}</Question>
              <CorrectText show={showCorrect} colorText={correctColor}>{textCorrect}</CorrectText>
            </BoxQuestion>
            
            <BoxOption>
              <Option onClick={() => this.optionClicked('A', actualQ.correct_option, this.state)} correctOption={backColor[0]}>{actualQ.option_a}</Option>
            </BoxOption>
            <BoxOption>
              <Option onClick={() => this.optionClicked('B', actualQ.correct_option, this.state)} correctOption={backColor[1]}>{actualQ.option_b}</Option>
            </BoxOption>
            <BoxOption>
              <Option onClick={() => this.optionClicked('C', actualQ.correct_option, this.state)} correctOption={backColor[2]}>{actualQ.option_c}</Option>
            </BoxOption>
            <BoxOption>
              <Option onClick={() => this.optionClicked('D', actualQ.correct_option, this.state)} correctOption={backColor[3]}>{actualQ.option_d}</Option>
            </BoxOption>
            <ProgressSubBoxM total={total} mobileV>
              <Line percent={correct / total * 100} strokeWidth="4" strokeColor={this.state.feedbackColor} />
            </ProgressSubBoxM>
            <Correct mobileV="true">
Puntaje:
              {correct}
/
              {total}
            </Correct>
          </SubBox>


        </Box>
      );
    } return (
      <Box>
        <TitleBox>
          <Title>¿Cuánto conocés?</Title>
          <Triangle />
        </TitleBox>
        <SubBox>
          <ReactLoading type="spin" color="#067995" height="5%" width="5%" />
        </SubBox>
      </Box>
    );
  }
}
export default Trivia;

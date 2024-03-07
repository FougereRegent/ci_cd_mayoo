import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from '../Quizz/components/Main'
import Header from "../Quizz/components/Header";
import QuizzDetails from "../Quizz/components/QuizzDetails";
import QuestionDetail from "../Quizz/components/QuestionDetail";
function App() {
    const QuizzWrapper = () => {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    };

    const NewQuizz = () => {
        return (
            <div>
                <Header />
                <QuizzDetails />
            </div>
        )
    }

    const QuestionQuizz = () => {
        return (
            <div>
                <Header />
                <QuestionDetail />
            </div>
        )
    }

  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/quizz" element={<QuizzWrapper />} />
                  <Route path="/quizz/new" element={<NewQuizz />} />
                  <Route path="/quizz/question/:questionNumber" element={<QuestionQuizz />} />
              </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;

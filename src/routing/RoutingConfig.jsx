import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Error404Page from '../pages/Error404Page';
import LessonPlanner from '../components/Planner/LessonPlanner.jsx';
import QuizUI from '../components/Assessment/QuizUI.jsx';
import MainPlanner from '../components/MainPlanner.jsx';
import WorkBook from '../components/Assessment/WorkBook.jsx';
import WorkSheet from '../components/Assessment/WorkSheet.jsx';
import GetStarted from '../components/GetStarted.jsx';
import Vocabulary from '../components/Learning/Vocabulary.jsx';
import ComingSoon from '../pages/ComingSoon.jsx';
import TongueTwister from '../components/Gamification/TongueTwister.jsx';
import WordPuzzle from '../components/Gamification/WordPuzzle.jsx';
import SocialStory from '../components/SpecialNeeds/SocialStory.jsx';
import SelGenerator from '../components/Learning/SelGenerator.jsx';
import SlideGenerator from '../components/Planner/SlideGenerator.jsx';
import RequestForm from '../routing/RecaptchaConfig.jsx';
import PdfSplitter from '../pages/PdfSplitter/PdfSplitter-main.jsx';
import TextSummarizer from '../components/Summarizer/TextSummarizer.jsx';
import GroupWork from '../components/Assessment/GroupWork.jsx';
import ReactGA from 'react-ga4';
import Maketheword from '../components/Gamification/Maketheword.jsx';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login/Login.jsx';
import Aboutus from '../pages/AboutUs/Aboutus.jsx';
import SatMaths from '../components/Assessment/SatMaths.jsx';

export default function RoutingConfig() {
  const location = useLocation();

  const routeTitleMap = {
    '/': 'AI Tools for Teachers',
    '/ai-tools-for-teachers': 'List of AI Tools for Teachers',
    '/about-us': 'About Us - AI Tools for Teachers',
    '/login': 'Login - AI Tools for Teachers',
    '/lesson-planner': 'Lesson Planner - AI Tools for Teachers',
    '/quiz-generator': 'Quiz Generator - AI Tools for Teachers',
    '/workbook-planner': 'Workbook - AI Tools for Teachers',
    '/worksheet-planner': 'Worksheet - AI Tools for Teachers',
    '/vocabulary-planner': 'Vocabulary - AI Tools for Teachers',
    '/tongue-twister': 'Tongue Twister - AI Tools for Teachers',
    '/word-puzzle': 'Word Puzzle - AI Tools for Teachers',
    '/social-story': 'Social Story - AI Tools for Teachers',
    '/sel-generator': 'SEL Generator - AI Tools for Teachers',
    '/slide-generator': 'Slide Generator - AI Tools for Teachers',
    '/text-summarizer': 'Text Summarizer - AI Tools for Teachers',
    '/group-work': 'Group Work - AI Tools for Teachers',
    '/make-the-word': 'Make the word - AI Tools for Teachers',
    '/sat-maths': 'SAT Math - AI Tools for Teachers',
    '/contact-us': 'Contact Us - AI Tools for Teachers',
    '/pdf-splitter': 'Pdf Splitter - AI Tools for Teachers',
    '/comingsoon': 'Comingsoon - AI Tools for Teachers'
  };

  const pageTitle = routeTitleMap[location.pathname] || 'Error 404 - AI Tools for Teachers';

  const API_BASE_URL = "https://vn.chimpvine.com";

  const BASE_URL = 'https://teachertools-api.chimpvine.com';
  
  ReactGA.initialize('G-TBNNYXX21K');

  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<GetStarted API_BASE_URL={API_BASE_URL}/>} />
        <Route path="/login" element={<Login API_BASE_URL={API_BASE_URL}/>}  />
        <Route path="/about-us" element={<Aboutus />} />
        <Route element={<PrivateRoute />}>
          <Route path="/ai-tools-for-teachers" element={<MainPlanner />} />
          <Route path="/lesson-planner" element={<LessonPlanner BASE_URL={BASE_URL} />} />
          <Route path="/quiz-generator" element={<QuizUI BASE_URL={BASE_URL} />} />
          <Route path="/workbook-planner" element={<WorkBook BASE_URL={BASE_URL} />} />
          <Route path="/worksheet-planner" element={<WorkSheet BASE_URL={BASE_URL} />} />
          <Route path="/vocabulary-planner" element={<Vocabulary BASE_URL={BASE_URL} />} />
          <Route path="/tongue-twister" element={<TongueTwister BASE_URL={BASE_URL} />} />
          <Route path="/word-puzzle" element={<WordPuzzle BASE_URL={BASE_URL} />} />
          <Route path="/social-story" element={<SocialStory BASE_URL={BASE_URL} />} />
          <Route path="/sel-generator" element={<SelGenerator BASE_URL={BASE_URL} />} />
          <Route path="/slide-generator" element={<SlideGenerator BASE_URL={BASE_URL} />} />
          <Route path="/text-summarizer" element={<TextSummarizer BASE_URL={BASE_URL} />} />
          <Route path="/group-work" element={<GroupWork BASE_URL={BASE_URL} />} />
          <Route path="/make-the-word" element={<Maketheword BASE_URL={BASE_URL} />} />
          <Route path="/sat-maths" element={<SatMaths BASE_URL={BASE_URL} />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
        </Route>
        <Route path="/contact-us" element={<RequestForm BASE_URL={BASE_URL} />} />
        <Route path="/pdf-splitter" element={<PdfSplitter />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </HelmetProvider>
  );
}

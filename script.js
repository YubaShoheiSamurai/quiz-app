const questions = [
  {
    question: '日本で最も高い山はどれですか？',
    choices: ['北岳', '奥穂高岳', '富士山', '槍ヶ岳'],
    correct: 2,
    explanation: '富士山の標高は3,776mで、日本最高峰です。静岡県と山梨県にまたがっています。'
  },
  {
    question: '血液を全身に送り出す臓器はどれですか？',
    choices: ['肺', '肝臓', '腎臓', '心臓'],
    correct: 3,
    explanation: '心臓はポンプの役割を果たし、血液を全身に循環させています。成人の心臓は1日に約10万回拍動します。'
  },
  {
    question: '元素記号「Fe」は何の元素ですか？',
    choices: ['銅', '金', '鉄', '銀'],
    correct: 2,
    explanation: 'Feは鉄の元素記号です。ラテン語の「Ferrum（フェルム）」に由来しています。'
  },
  {
    question: '「吾輩は猫である」の作者はだれですか？',
    choices: ['森鷗外', '夏目漱石', '芥川龍之介', '太宰治'],
    correct: 1,
    explanation: '夏目漱石が1905年に発表した長編小説で、名前のない猫の視点から人間社会を風刺した作品です。'
  },
  {
    question: '国連（国際連合）の本部が置かれている都市はどこですか？',
    choices: ['ジュネーブ', 'パリ', 'ロンドン', 'ニューヨーク'],
    correct: 3,
    explanation: '国連本部はアメリカのニューヨーク市マンハッタンにあります。1945年の設立当初から変わっていません。'
  },
  {
    question: '「モナ・リザ」を描いた画家はだれですか？',
    choices: ['ミケランジェロ', 'レンブラント', 'レオナルド・ダ・ヴィンチ', 'ピカソ'],
    correct: 2,
    explanation: 'レオナルド・ダ・ヴィンチが16世紀初頭に描いた作品で、現在はパリのルーヴル美術館に所蔵されています。'
  },
  {
    question: '世界で最も面積が大きい国はどこですか？',
    choices: ['カナダ', 'アメリカ', '中国', 'ロシア'],
    correct: 3,
    explanation: 'ロシアの面積は約1,710万km²で、日本の約45倍に相当します。世界の陸地面積の約11%を占めます。'
  },
  {
    question: '水の化学式はどれですか？',
    choices: ['CO₂', 'H₂O', 'NaCl', 'O₂'],
    correct: 1,
    explanation: '水は水素原子2つと酸素原子1つが結合したH₂Oです。地球上で最も豊富な液体物質です。'
  },
  {
    question: '1年のうち、昼の時間が最も長い日を何といいますか？',
    choices: ['春分', '秋分', '冬至', '夏至'],
    correct: 3,
    explanation: '夏至は6月21日頃で、北半球では昼が最も長く夜が最も短い日です。冬至はその逆にあたります。'
  },
  {
    question: '日本の国技はどれですか？',
    choices: ['柔道', '剣道', '相撲', '空手'],
    correct: 2,
    explanation: '相撲は日本の国技とされており、その歴史は1500年以上にわたります。大相撲は年6場所が開催されます。'
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('question-text');
const choicesList = document.getElementById('choices-list');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const explanationText = document.getElementById('explanation-text');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score-text');
const scoreMessage = document.getElementById('score-message');
const retryBtn = document.getElementById('retry-btn');

function showQuestion() {
  answered = false;
  const q = questions[currentIndex];

  progressText.textContent = `問題 ${currentIndex + 1} / ${questions.length}`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;

  questionText.textContent = q.question;

  choicesList.innerHTML = '';
  q.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(index));
    li.appendChild(btn);
    choicesList.appendChild(li);
  });

  feedback.className = 'feedback hidden';
  nextBtn.classList.add('hidden');

  const isLast = currentIndex === questions.length - 1;
  nextBtn.textContent = isLast ? '結果を見る' : '次の問題へ';
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesList.querySelectorAll('.choice-btn');

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correct) {
      btn.classList.add('correct');
    } else if (index === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.className = 'feedback correct';
    feedbackText.textContent = '正解！';
  } else {
    feedback.className = 'feedback incorrect';
    feedbackText.textContent = `不正解… 正解は「${q.choices[q.correct]}」です。`;
  }

  explanationText.textContent = q.explanation;
  nextBtn.classList.remove('hidden');
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  scoreText.textContent = `${questions.length}問中 ${score}問正解`;

  let message = '';
  if (score === questions.length) {
    message = '満点です！素晴らしい知識をお持ちですね！';
  } else if (score >= 4) {
    message = 'とても良い結果です！あと少しで満点でした。';
  } else if (score >= 3) {
    message = 'まずまずの結果です。もう一度挑戦してみましょう！';
  } else {
    message = '難しかったかもしれません。ぜひ再挑戦してみてください！';
  }
  scoreMessage.textContent = message;
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
});

showQuestion();

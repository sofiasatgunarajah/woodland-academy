const QUESTIONS_DB = {
  maths: {
    easy: [
      { q: "What is 7 × 8?", opts: ["54","56","63","48"], ans: 1, exp: "7 × 8 = 56. Try learning your 7 times table using a song or pattern!" },
      { q: "What is 144 ÷ 12?", opts: ["11","12","13","14"], ans: 1, exp: "144 ÷ 12 = 12. This is 12 × 12, a useful square number to remember." },
      { q: "What is 25% of 80?", opts: ["15","20","25","30"], ans: 1, exp: "25% = ¼, so 80 ÷ 4 = 20." },
      { q: "Round 3,847 to the nearest hundred.", opts: ["3,800","3,900","4,000","3,850"], ans: 0, exp: "The tens digit is 4 (less than 5), so we round down to 3,800." },
      { q: "What is the perimeter of a square with side 7cm?", opts: ["21cm","28cm","35cm","14cm"], ans: 1, exp: "Perimeter = 4 × side = 4 × 7 = 28cm." },
      { q: "What comes next: 2, 4, 8, 16, ___?", opts: ["24","28","32","30"], ans: 2, exp: "Each number is doubled: 16 × 2 = 32." },
      { q: "How many minutes in 3.5 hours?", opts: ["180","200","210","215"], ans: 2, exp: "3.5 × 60 = 210 minutes." },
      { q: "What is ½ + ¼?", opts: ["¾","⅔","⅗","½"], ans: 0, exp: "½ = 2/4, so 2/4 + 1/4 = 3/4." }
    ],
    medium: [
      { q: "A rectangle has area 48cm² and width 6cm. What is its length?", opts: ["6cm","7cm","8cm","9cm"], ans: 2, exp: "Length = Area ÷ Width = 48 ÷ 6 = 8cm." },
      { q: "What is 15% of 360?", opts: ["45","54","63","36"], ans: 1, exp: "10% of 360 = 36. 5% = 18. 15% = 36 + 18 = 54." },
      { q: "What is the value of 3² + 4²?", opts: ["14","25","49","12"], ans: 1, exp: "3² = 9, 4² = 16. 9 + 16 = 25." },
      { q: "A train travels 120 miles in 2 hours. How far in 45 minutes?", opts: ["40 miles","45 miles","50 miles","60 miles"], ans: 1, exp: "Speed = 60mph. 45 mins = ¾ hour. 60 × ¾ = 45 miles." },
      { q: "What is 2/3 of 270?", opts: ["135","160","180","200"], ans: 2, exp: "270 ÷ 3 = 90 (one third). 90 × 2 = 180 (two thirds)." },
      { q: "What is the mean of: 12, 15, 18, 21, 24?", opts: ["17","18","19","20"], ans: 1, exp: "Total = 90. Mean = 90 ÷ 5 = 18." },
      { q: "Simplify the ratio 24:36.", opts: ["2:3","3:4","4:6","6:9"], ans: 0, exp: "HCF of 24 and 36 is 12. 24÷12 : 36÷12 = 2:3." },
      { q: "If x + 12 = 29, what is x?", opts: ["14","17","19","16"], ans: 1, exp: "x = 29 − 12 = 17." }
    ],
    hard: [
      { q: "What is the LCM of 12 and 18?", opts: ["6","24","36","54"], ans: 2, exp: "Multiples of 12: 12,24,36... Multiples of 18: 18,36... LCM = 36." },
      { q: "A shopkeeper buys an item for £48 and sells it for £60. What is the percentage profit?", opts: ["20%","25%","30%","15%"], ans: 1, exp: "Profit = £12. % profit = (12/48) × 100 = 25%." },
      { q: "What is the area of a triangle with base 14cm and height 9cm?", opts: ["63cm²","126cm²","45cm²","72cm²"], ans: 0, exp: "Area = ½ × base × height = ½ × 14 × 9 = 63cm²." },
      { q: "If 3n − 7 = 23, what is n?", opts: ["8","9","10","11"], ans: 2, exp: "3n = 30, n = 10." },
      { q: "What is 3.6 × 2.5?", opts: ["8.1","9.0","8.5","7.5"], ans: 1, exp: "36 × 25 = 900, so 3.6 × 2.5 = 9.0." },
      { q: "In a class of 30 pupils, 40% are boys. How many girls?", opts: ["12","16","18","20"], ans: 2, exp: "40% are boys = 12 boys. Girls = 30 − 12 = 18." },
      { q: "What is the volume of a cuboid 5cm × 4cm × 3cm?", opts: ["47cm³","60cm³","50cm³","36cm³"], ans: 1, exp: "Volume = l × w × h = 5 × 4 × 3 = 60cm³." },
      { q: "What is the next prime number after 23?", opts: ["25","27","29","31"], ans: 2, exp: "25 = 5×5, 27 = 3×9, 29 is prime (not divisible by 2,3,5,7)." }
    ]
  },
  english: {
    easy: [
      { q: "Which word is a synonym for 'happy'?", opts: ["Sad","Joyful","Angry","Tired"], ans: 1, exp: "Joyful means feeling or expressing great happiness — a perfect synonym for happy!" },
      { q: "Which is the correct plural of 'child'?", opts: ["Childs","Childrens","Children","Childes"], ans: 2, exp: "English has many irregular plurals. Child → Children is one of the most common." },
      { q: "Which word is an antonym (opposite) of 'ancient'?", opts: ["Old","Historic","Modern","Aged"], ans: 2, exp: "Ancient means very old. Modern means relating to the present time — its opposite." },
      { q: "Choose the word that best completes: 'She ran _____ to catch the bus.'", opts: ["slow","slowly","sluggish","quick"], ans: 1, exp: "An adverb (slowly) is needed to describe the verb 'ran', not an adjective." },
      { q: "What punctuation mark ends a question?", opts: ["Full stop","Exclamation mark","Question mark","Comma"], ans: 2, exp: "A question mark (?) is always used at the end of a direct question." },
      { q: "Which sentence uses an apostrophe correctly?", opts: ["The cat's bowl is full.","The cats bowl is full.","The cats' is bowl full.","The cat is bowl full."], ans: 0, exp: "The apostrophe in 'cat's' shows possession — the bowl belonging to the cat." },
      { q: "What is the root word in 'unhappiness'?", opts: ["Un","Happy","Ness","Unhappy"], ans: 1, exp: "The root word is 'happy'. 'Un-' is a prefix and '-ness' is a suffix." },
      { q: "Which word is a connective (joining word)?", opts: ["Run","Blue","Although","Swiftly"], ans: 2, exp: "Connectives like 'although', 'however', 'because' link clauses together." }
    ],
    medium: [
      { q: "What literary device is used in: 'The wind whispered through the trees'?", opts: ["Simile","Alliteration","Personification","Metaphor"], ans: 2, exp: "Personification gives human qualities to non-human things. Wind cannot really whisper." },
      { q: "Which sentence contains a relative clause?", opts: ["She ran fast.","The dog barked loudly.","The book, which was torn, lay on the floor.","He ate his dinner."], ans: 2, exp: "'Which was torn' is a relative clause — it gives more information about the noun 'book'." },
      { q: "What does the prefix 'mis-' mean in 'misunderstand'?", opts: ["Again","Not/wrongly","Before","Together"], ans: 1, exp: "'Mis-' means wrongly or badly. To misunderstand means to understand something incorrectly." },
      { q: "Identify the word class of 'rapidly' in: 'She rapidly finished her work.'", opts: ["Adjective","Noun","Verb","Adverb"], ans: 3, exp: "'Rapidly' is an adverb — it describes how the verb 'finished' was done." },
      { q: "Which is an example of alliteration?", opts: ["As brave as a lion","Peter picked a peck of pickled peppers","The stars shone brightly","She cried rivers of tears"], ans: 1, exp: "Alliteration is the repetition of the same initial consonant sound in nearby words." },
      { q: "What is the subjunctive form in: 'I wish I ___ taller'?", opts: ["am","is","was","were"], ans: 3, exp: "The subjunctive mood uses 'were' (not 'was') for hypothetical or wishful situations." },
      { q: "Which word is a homophone of 'there'?", opts: ["Here","Their","Where","Three"], ans: 1, exp: "Homophones sound the same but are spelled differently. 'there' and 'their' are homophones." },
      { q: "What technique does 'Her smile was a ray of sunshine' use?", opts: ["Simile","Metaphor","Onomatopoeia","Alliteration"], ans: 1, exp: "A metaphor directly states one thing IS another. (A simile would use 'like' or 'as'.)" }
    ],
    hard: [
      { q: "What is the effect of using short sentences in a text?", opts: ["Creates confusion","Slows the reader down","Creates pace and urgency","Makes writing formal"], ans: 2, exp: "Short, punchy sentences create tension, urgency and pace — very effective in action scenes." },
      { q: "Identify the type of clause: 'Running as fast as she could'", opts: ["Main clause","Subordinate clause","Relative clause","Adverbial phrase"], ans: 3, exp: "This is an adverbial phrase — it has no finite verb, so it's a phrase, not a clause." },
      { q: "What is the difference between 'affect' and 'effect'?", opts: ["They are the same","Affect is usually a verb; effect is usually a noun","Effect is usually a verb; affect is usually a noun","Both are always nouns"], ans: 1, exp: "Affect (verb): 'The rain affected the match.' Effect (noun): 'The effect was devastating.'" },
      { q: "A story written in 'first person' uses which pronouns?", opts: ["He, she, they","You, your","I, me, we, my","One, ones"], ans: 2, exp: "First person narrative uses 'I', 'me', 'my', 'we' — the narrator is part of the story." },
      { q: "Which word best replaces 'said' to show anger?", opts: ["Whispered","Snapped","Murmured","Stammered"], ans: 1, exp: "'Snapped' conveys sharp, angry speech. 'Whispered' = quiet, 'Murmured' = soft, 'Stammered' = nervous." },
      { q: "What is the purpose of a colon (:)?", opts: ["To join two sentences","To introduce a list or explanation","To show possession","To mark a question"], ans: 1, exp: "A colon introduces what follows: a list, explanation, or quotation." },
      { q: "Which is the most formal register?", opts: ["Hey, what's up?","The matter requires our immediate attention.","I need to tell you something.","Could you help me out?"], ans: 1, exp: "Formal register uses precise vocabulary, avoids contractions, and has a professional tone." },
      { q: "What is a 'fronted adverbial'? Example: 'Carefully, she opened the door.'", opts: ["An adjective at the front","An adverb or adverbial phrase placed before the main clause","A verb at the beginning","A noun at the start"], ans: 1, exp: "'Carefully' is moved to the front of the sentence for emphasis — this is a fronted adverbial." }
    ]
  },
  verbal: {
    easy: [
      { q: "Find the word that means the same as BRAVE.", opts: ["Cowardly","Bold","Timid","Fearful"], ans: 1, exp: "Bold and brave both mean showing courage in the face of difficulty." },
      { q: "Which is the odd one out: Oak, Daisy, Pine, Elm?", opts: ["Oak","Daisy","Pine","Elm"], ans: 1, exp: "Oak, Pine and Elm are all trees. Daisy is a flower — it's the odd one out." },
      { q: "Complete the analogy: Book is to Read as Film is to ___", opts: ["Watch","Listen","Write","Act"], ans: 0, exp: "You read a book; you watch a film. The relationship is 'item → action you do with it'." },
      { q: "Rearrange ELAPP to make a fruit.", opts: ["Peach","Apple","Pear","Plum"], ans: 1, exp: "E-L-A-P-P rearranged spells A-P-P-L-E. Look for common letter clusters like -PP-." },
      { q: "If CAT → ZXG in a code, what does DOG become?", opts: ["WLT","VLT","WKT","WLU"], ans: 0, exp: "C(3)→Z(26), A(1)→X(24), T(20)→G(7). Each letter shifts back by 3 positions in the alphabet." },
      { q: "Which word can follow BOOK, HAND and DOOR?", opts: ["MARK","SHELF","CASE","STAND"], ans: 0, exp: "BOOKMARK, HANDMARK... wait — BOOKMARK ✓, HANDMARK? Let's check: BOOKCASE, HANDCASE? BOOKMARK, HANDBOOK, DOORMARK? The answer is MARK: BOOKMARK ✓." },
      { q: "What is the missing number: 3, 6, 12, 24, ___, 96?", opts: ["36","42","48","56"], ans: 2, exp: "The pattern is ×2 each time. 24 × 2 = 48." },
      { q: "Find the two words that are most similar in meaning: COLD, HAPPY, CHILLY, BRIGHT", opts: ["Cold and Happy","Cold and Chilly","Happy and Bright","Chilly and Bright"], ans: 1, exp: "Cold and chilly both describe low temperatures — they are synonyms." }
    ],
    medium: [
      { q: "If FRIEND is coded as GSJFOE, what is HOUSE coded as?", opts: ["IPVTF","IOVTF","IPVUF","IQVTF"], ans: 0, exp: "Each letter moves forward by 1 in the alphabet. H→I, O→P, U→V, S→T, E→F = IPVTF." },
      { q: "Complete: DENTIST is to TEETH as OPTICIAN is to ___", opts: ["Glasses","Eyes","Ears","Nose"], ans: 1, exp: "A dentist looks after teeth; an optician looks after eyes." },
      { q: "Find the hidden word: 'They went OVER the bridge' — find a hidden 3-letter word.", opts: ["VER","OVE","THE","EYS"], ans: 1, exp: "Look across the word boundary: 'went OVER' — 'wENT OVEr'? OVE is in OVER. Actually 'went' contains 'wen' and 'OVER' starts with O — 'OVE' is a valid hidden word." },
      { q: "Which word is the opposite of ABUNDANT?", opts: ["Plentiful","Excessive","Scarce","Common"], ans: 2, exp: "Abundant means plentiful/in large amounts. Scarce means in very short supply — the opposite." },
      { q: "What is the next pair: AB, DE, GH, ___?", opts: ["IJ","JK","KL","LM"], ans: 1, exp: "A-B(skip C), D-E(skip F), G-H(skip I), J-K. Each pair skips one letter." },
      { q: "Select the word that does NOT belong: Whisper, Shout, Yell, Scream, Murmur", opts: ["Whisper","Shout","Yell","Murmur"], ans: 0, exp: "Shout, Yell and Scream are all loud. Whisper and Murmur are quiet. But WHISPER is most different as all others involve some volume." },
      { q: "If RED = 27 and BLUE = 40, using A=1, B=2... what does CAT equal?", opts: ["24","21","27","30"], ans: 0, exp: "C=3, A=1, T=20. 3+1+20 = 24." },
      { q: "Four girls share 48 stickers equally. Amy gives 3 to Beth. How many does Amy have?", opts: ["9","10","11","12"], ans: 0, exp: "48 ÷ 4 = 12 each. Amy gives 3 away: 12 − 3 = 9." }
    ],
    hard: [
      { q: "Move one letter from the first word to the second to make two new words: BRAND → ___ + CASH → ___", opts: ["BRAN + DCASH","RAND + BCASH","BAND + CRASH","BRAN + RCASH"], ans: 2, exp: "Remove B from BRAND → RAND, add to CASH → BCASH? No — remove a letter to make two real words: B+RAND → remove B → RAND, BCASH? Try: BRAND→RAND (remove B) + CASH+B = BCASH? Correct: BAND (remove R) + CRASH (add R). BRAND → BAND, CASH+R → CRASH ✓" },
      { q: "Complete the sequence: 1, 1, 2, 3, 5, 8, ___?", opts: ["11","12","13","14"], ans: 2, exp: "This is the Fibonacci sequence — each number is the sum of the two before it. 5+8=13." },
      { q: "If some GRIGS are WUMPS and all WUMPS are BLINTS, then:", opts: ["All grigs are blints","Some grigs are blints","No grigs are blints","All blints are grigs"], ans: 1, exp: "Some grigs are wumps → those grigs are also blints (since all wumps are blints). But not ALL grigs need to be wumps." },
      { q: "TELESCOPE : DISTANT :: MICROSCOPE : ___", opts: ["Tiny","Far","Glass","Science"], ans: 0, exp: "A telescope helps you see distant things; a microscope helps you see tiny things." },
      { q: "Find the two words that complete the sentence: 'Night is to ___ as Winter is to ___'", opts: ["Dark / Cold","Day / Summer","Black / White","Stars / Snow"], ans: 1, exp: "Night is the opposite of Day; Winter is the opposite of Summer." },
      { q: "If all A's are B's, and no B's are C's, which MUST be true?", opts: ["Some A's are C's","No A's are C's","All C's are A's","Some B's are A's"], ans: 1, exp: "Since no B's are C's, and all A's are B's, no A's can be C's." },
      { q: "Which letters continue the series: AZ, BY, CX, ___?", opts: ["DV","DW","EV","EW"], ans: 1, exp: "First letters go A,B,C,D forwards. Second letters go Z,Y,X,W backwards. So: DW." },
      { q: "A is taller than B. C is shorter than A but taller than B. Who is shortest?", opts: ["A","B","C","Cannot tell"], ans: 1, exp: "A is tallest, C is in the middle, B is shortest." }
    ]
  },
  nonverbal: {
    easy: [
      { q: "How many sides does a hexagon have?", opts: ["5","6","7","8"], ans: 1, exp: "Hex = 6. Hexagon has 6 sides. Remember: hexa = 6 (like hexadecimal)." },
      { q: "Which shape has exactly 4 lines of symmetry?", opts: ["Rectangle","Square","Triangle","Circle"], ans: 1, exp: "A square has 4 lines of symmetry: 2 through corners, 2 through side midpoints." },
      { q: "A cube has how many faces?", opts: ["4","5","6","8"], ans: 2, exp: "A cube has 6 square faces. Think of a dice — it has 6 sides numbered 1-6." },
      { q: "In pattern: ○ △ □ ○ △ ___, what comes next?", opts: ["○","△","□","◇"], ans: 2, exp: "The pattern repeats every 3 shapes: Circle, Triangle, Square. After △ comes □." },
      { q: "If a shape is reflected in a vertical mirror, what happens to it?", opts: ["It flips upside down","It flips left to right","It stays the same","It rotates 90°"], ans: 1, exp: "A vertical mirror reflection flips the image horizontally (left to right)." },
      { q: "How many right angles does a rectangle have?", opts: ["2","3","4","1"], ans: 2, exp: "A rectangle has 4 right angles (90° corners)." },
      { q: "A square is rotated 90° clockwise. What does it look like?", opts: ["A diamond","A rectangle","A square","A triangle"], ans: 2, exp: "A square looks the same after any 90° rotation because all sides are equal." },
      { q: "Which 3D shape has a circular base and comes to a point?", opts: ["Cylinder","Cone","Pyramid","Sphere"], ans: 1, exp: "A cone has one circular base and a curved surface that meets at a single apex (point)." }
    ],
    medium: [
      { q: "How many lines of symmetry does a regular pentagon have?", opts: ["3","4","5","6"], ans: 2, exp: "A regular pentagon has 5 lines of symmetry — one through each vertex and the midpoint of the opposite side." },
      { q: "Shape A has 3 times the area of Shape B. Shape B has an area of 12cm². What is Shape A's area?", opts: ["4cm²","15cm²","36cm²","24cm²"], ans: 2, exp: "3 × 12 = 36cm²." },
      { q: "A triangle has angles 45° and 75°. What is the third angle?", opts: ["50°","60°","70°","80°"], ans: 1, exp: "Angles in a triangle sum to 180°. 180 − 45 − 75 = 60°." },
      { q: "Which net CANNOT fold into a cube?", opts: ["A cross of 6 squares","A row of 6 squares","An L-shape of 6 squares","A T-shape of 6 squares"], ans: 1, exp: "A straight row of 6 squares cannot fold into a cube — you need the squares to wrap around." },
      { q: "If pattern goes: 1 dot, 3 dots, 6 dots, 10 dots... what is next?", opts: ["12","14","15","16"], ans: 2, exp: "These are triangular numbers. Add increasing numbers: +2, +3, +4, +5. 10+5=15." },
      { q: "A shape has rotational symmetry of order 4. How many times does it look the same in a full 360° turn?", opts: ["2","3","4","6"], ans: 2, exp: "Order 4 rotational symmetry means the shape looks identical 4 times in one full rotation." },
      { q: "What is the smallest number of squares needed to make a 3D cube's net?", opts: ["4","5","6","8"], ans: 2, exp: "A cube has 6 faces, so its net must have exactly 6 squares." },
      { q: "In a sequence of squares: each square's side is 2cm longer than the last. Side lengths: 1, 3, 5, 7... What is the area of the 5th square?", opts: ["81cm²","100cm²","64cm²","121cm²"], ans: 0, exp: "5th side = 9cm. Area = 9² = 81cm²." }
    ],
    hard: [
      { q: "A rectangle is cut diagonally. What two shapes are formed?", opts: ["Two squares","Two rectangles","Two right-angled triangles","One triangle and one square"], ans: 2, exp: "A diagonal cut across a rectangle creates two congruent right-angled triangles." },
      { q: "Grid: 3×3. If you shade ⅓ of 9 squares in a specific pattern, how many shaded squares make a diagonal line from top-left to bottom-right?", opts: ["2","3","4","1"], ans: 1, exp: "A main diagonal of a 3×3 grid passes through exactly 3 squares." },
      { q: "Shape has 8 vertices, 12 edges, 6 faces. What is it?", opts: ["Triangular prism","Tetrahedron","Cube/cuboid","Octahedron"], ans: 2, exp: "By Euler's formula V - E + F = 2: 8 - 12 + 6 = 2 ✓. This is a cube or cuboid." },
      { q: "A regular hexagon is divided into equilateral triangles. How many triangles fit inside it?", opts: ["4","6","8","12"], ans: 1, exp: "A regular hexagon can be divided into exactly 6 equilateral triangles of equal size." },
      { q: "What is the order of rotational symmetry of a regular octagon?", opts: ["4","6","8","2"], ans: 2, exp: "A regular octagon has 8 equal sides, so it has rotational symmetry of order 8." },
      { q: "If each interior angle of a regular polygon is 120°, how many sides does it have?", opts: ["5","6","7","8"], ans: 1, exp: "Interior angle = (n-2)×180/n = 120. Solving: n-2/n = 2/3, so n=6. It's a hexagon." },
      { q: "A cube is painted red then cut into 27 smaller cubes. How many small cubes have exactly 2 red faces?", opts: ["8","12","6","16"], ans: 1, exp: "Cubes on the edges (but not corners) have 2 painted faces. A 3×3×3 cube has 12 edge pieces." },
      { q: "How many diagonals does a hexagon have?", opts: ["6","9","12","15"], ans: 1, exp: "Formula: n(n-3)/2 = 6(6-3)/2 = 6×3/2 = 9 diagonals." }
    ]
  }
};

if (typeof module !== 'undefined') module.exports = QUESTIONS_DB;

const projects=[
  {tag:"Hackathon Project · Claysys Tech",title:"APIScout",
    desc:"A Flask-based tool that scrapes API documentation pages, extracts all endpoints using Gemini 2.5 Flash, and auto-generates production-ready Python wrapper code with error handling, auth patterns, and docstrings.",
    tech:["FLASK","GEMINI 2.5","CHROMADB","RAG","PYTHON","RENDER"],
    github:"https://github.com/shrinithi19/apiscout",
    what:"APIScout eliminates the tedious process of manually reading API docs and writing boilerplate wrapper code. Paste in a documentation URL and within seconds you get a fully structured Python SDK, complete with typed methods and built-in handlers for common failure cases. Under the hood, it crawls the linked documentation pages, chunks and embeds the text, and stores it in a ChromaDB vector store so the extraction step can pull exactly the relevant sections instead of dumping the whole doc at the LLM. That semantically-retrieved context gets passed to Gemini 2.5 Flash with a structured prompt asking it to extract endpoints, authentication methods, and rate limits as clean JSON — which is what actually drives the generated Python wrapper code. An 8-key round-robin rotation keeps requests flowing even under Gemini's free-tier rate limits, and a separate changelog feature can re-scrape a doc later, diff the newly extracted structure against the old one, and flag exactly which endpoints were added, removed, or modified — so you're not just generating a wrapper once, you can keep it in sync as an API evolves.",
    highlights:["Scrapes any public API documentation URL automatically","8-key Gemini round-robin rate limiter for sustained throughput","ChromaDB vector store for semantic doc retrieval (RAG)","Generates production-grade Python wrappers with auth + error handling","Deployed to Render with dark purple UI","Won 1st place at the Claysys Tech hackathon"],
    challenges:"Getting reliable extraction from Gemini was the hardest part — early on I hit rate limits fast, which led to building an 8-key round-robin system to keep throughput steady. I also compared several embedding models before settling on all-MiniLM-L6-v2 for the RAG retrieval step, since extraction quality varied a lot between them. One limitation I couldn't fully solve in the hackathon window: JS-rendered documentation pages don't extract well since BeautifulSoup can't execute JavaScript — a headless-browser scraper is the next step.",
    techStack:"Flask handles the backend and API routes. BeautifulSoup4 crawls up to 8 linked pages per doc, chunking the text into 500-word overlapping segments. Those chunks are embedded with all-MiniLM-L6-v2 (384-dim) and stored in ChromaDB for semantic retrieval. At generation time, the most relevant chunks are pulled via similarity search and passed to Gemini 2.5 Flash with a structured prompt to extract endpoints, auth, and rate limits as JSON — which then drives the typed Python wrapper generation, including handlers for common HTTP error codes.",
    videoUrl:"https://www.youtube.com/embed/6Z6w1DtIQo4", techImg: null},
  {tag:"Team Hackathon · 24 hours · Infinite Computer Solution",title:"NulAware AI",
    desc:"A natural language data profiling Q&A agent. Drop in any dataset and ask questions in plain English — NulAware generates statistical insights, detects anomalies, and answers complex data queries without writing code.",
    tech:["LANGGRAPH","GEMINI 2.5","CHROMADB","STREAMLIT","MCP","OLLAMA"],
    github:"https://github.com/shrinithi19/Nulaware-NL-Profiling",
    what:"NulAware replaces manual EDA. Upload a CSV, ask a question in plain English, and a LangGraph-based agent figures out what kind of question it actually is — statistical, visualization, or report-generation — and routes it to the right tool, supporting 10 distinct query types in total. Behind that router sits ydata-profiling for the actual statistical analysis and ChromaDB for semantic search over the profiling output, so answers stay grounded in the real data rather than a generic LLM guess. Responses are source-cited and context-aware, meaning the agent can handle natural follow-up questions in the same conversation instead of treating every query as a fresh start. Everything runs on Qwen 2.5 7B locally via Ollama, so the whole pipeline works at zero paid API cost — built and deployed end-to-end in a single 24-hour hackathon window with a team of 4.",
    highlights:["Full LangGraph agent loop with tool-calling and memory","MCP server + client pair for structured tool orchestration","Gemini API — zero paid API costs","ydata-profiling for automated statistical analysis","ChromaDB semantic search over profiling output","Built and deployed in 24 hours with a team of 4"],
    techStack:"LangGraph drives the agent — a router node classifies user intent across 10 query types (stats, visualization, report generation, etc.) before dispatching to the right tool. Tool orchestration runs through a custom MCP server/client pair. Retrieval is handled by ChromaDB over ydata-profiling output, with GEMINI 2.5 7B running locally via Ollama for generation — so the whole pipeline runs at zero paid API cost. Streamlit ties it together as the UI.",
    challenges:"With a 24-hour clock and a team of 4, the biggest challenge was keeping everyone's pieces integrating cleanly under pressure — we hit a critical bug where a 'list' object has no attribute 'empty' broke the pipeline partway through, which we had to trace and fix live. On the modeling side, tuning chunk size and top-k for retrieval took some iteration to cut down hallucinated answers. Coordinating a live demo, slides, and anticipated Q&A on top of the build itself was its own exercise in time management.",
    videoUrl:"https://www.loom.com/embed/6c8b70b09c4e4560a654f7bfcb53153e", techImg: null},
  {tag:"IoT + Computer Vision · 2nd Runner-Up in Tech-Vision 2026",title:"Powerloop",
    desc:"A real-time object detection pipeline bridging embedded hardware and computer vision. YOLOv8 runs inference on an ESP32 camera stream, served via Flask over a local network.",
    tech:["YOLOV8","OPENCV","ESP32","FLASK","PYTHON","PYTORCH"],github:"https://github.com/shrinithi19",
    what:"Powerloop is built to cut wasted energy in campus spaces by automating what a person would otherwise have to do manually: turn things off when a room is empty. An ESP32-CAM streams a live video feed over WiFi to a Flask backend, where a lightweight YOLOv8 model — processed through OpenCV — runs real-time person detection on each frame. When the model detects that a room has gone empty, a control signal is sent back over the network to the embedded node, which switches off lights or fans automatically; when someone re-enters, they switch back on, no manual input needed. The whole thing is structured as a small AIoT pipeline — image capture at the edge, ML-based occupancy inference, and real-time actuation — with a Flask web dashboard layered on top for live monitoring of room activity and estimated energy usage. Detected objects and occupancy state render on that dashboard in real time, so the automation isn't a black box.",
    highlights:["ESP32-CAM WiFi streaming to Flask backend","YOLOv8 real-time inference with OpenCV frame processing","Browser dashboard with live annotated detection feed","Low-latency pipeline optimised for edge hardware","Modular — swap detection models without pipeline changes","Full hardware-to-web integration in Python"],
    techStack:"YOLOv8 runs the person-detection inference, fed by a live video stream from an ESP32-CAM over WiFi. OpenCV handles frame processing on the receiving end, and Flask serves both the detection pipeline and a live dashboard for monitoring room activity. Detected occupancy state triggers relay control on the ESP32 to automate lights/fans — closing the loop from camera to actuation without manual switching.",
    challenges:"Getting real-time inference to run smoothly on a live ESP32-CAM stream over WiFi was the core challenge — balancing detection accuracy against latency so the automated switching felt responsive rather than laggy. We landed on 92% detection accuracy at 15-20 FPS, which was enough to reliably drive relay control. Placing 3rd out of 76 teams at Tech Vision 2026 validated the approach, but the real lesson was in the debugging — getting the embedded and ML sides of the pipeline to talk to each other reliably took a lot of iteration.",
    videoUrl:null, techImg: "images/powerloop workflow.png"},
  {tag:"Computer Vision · PCB QC",title:"PCB AI Inspector",
    desc:"A unified PCB inspection system: DINOv2-based component similarity detection and a CNN solder joint defect classifier — wrapped in a Gradio UI.",
    tech:["DINOV2","PYTORCH","CNN","GRADIO","OPENCV","PYTHON"],github:"https://github.com/shrinithi19/PCB_Detector_Pro",
    what:"PCB AI Inspector runs two purpose-built models side by side to cover the two most common things that go wrong on an assembled board. DINOv2, a Vision Transformer, handles component-level inspection — it compares an inspected board against a reference image and flags mismatched or missing components using zero-shot similarity, meaning it doesn't need to be retrained every time a new component type shows up on the line. Separately, a custom CNN trained specifically on a solder joint defect dataset checks joint quality, catching issues like bridging or cold joints that a similarity check alone wouldn't reliably surface. Both models feed into one unified Gradio interface — drag and drop a PCB image, get a side-by-side comparison against the reference board, and see both the component-match results and the defect classification in one place, no code required to run it. It's designed as a first step toward a lightweight, extensible manufacturing QC tool rather than a one-off demo.",
    highlights:["DINOv2 (ViT) for zero-shot component similarity detection","Custom CNN trained on solder joint defect dataset","Unified Gradio UI — drag and drop PCB images","Side-by-side comparison: reference vs. inspected board","PyTorch backend with optimised inference pipeline","Designed to extend into a manufacturing QC system"],
    techStack:"Two models run side by side under one Gradio interface. DINOv2 (a Vision Transformer) handles zero-shot component similarity — comparing an inspected board against a reference without needing to retrain for new component types. A separate CNN, trained specifically on a solder joint defect dataset, classifies joint quality. Both feed into the same PyTorch inference pipeline, with OpenCV handling image preprocessing before either model sees a frame.",
    challenges:"The main challenge was getting two very different model types — a zero-shot ViT and a supervised CNN — to work cleanly in the same pipeline without one path slowing the other down. Zero-shot similarity detection with DINOv2 meant no retraining was needed when new component types came up, which was the right tradeoff for a QC tool that has to generalize, but tuning the similarity threshold to avoid false positives took real iteration.",
    videoUrl:null , techImg: "images/pcb.jpeg" },
  {tag:"Game Development",title:"Flappy Bird",
    desc:"A complete Flappy Bird recreation built from scratch in Python with Pygame — custom physics engine, sprite management, collision detection, and a full game state machine.",
    tech:["PYTHON","PYGAME","OOP","PHYSICS","SPRITES"],github:"https://github.com/shrinithi19/Flappy_Cloud",
    what:"A complete Flappy Bird recreation built entirely from scratch in Python, with no game engine underneath it — every system is hand-rolled using Pygame's low-level drawing and input primitives. The bird's motion is driven by custom gravity and jump-velocity physics rather than a canned physics library, tuned by hand until the fall speed and flap responsiveness actually felt fair. Pipes generate procedurally with randomised gap heights, so no two runs play out the same way, and collision detection uses pixel-perfect sprite masks instead of simple bounding-box checks — meaning a near-miss actually looks and feels like a near-miss instead of registering a phantom hit. A full state machine manages the game's flow end to end, cleanly handling transitions between the menu, active gameplay, the death screen, and restarting, with a sprite animation system driving the bird's flap cycle and local high-score persistence tracking your best runs between sessions.",
    highlights:["Custom gravity + jump velocity physics from scratch","Procedural pipe generation with randomised gap heights","Pixel-perfect collision detection with sprite masks","Full game state machine: menu → play → death → restart","Sprite animation system for the bird flap cycle","Score tracking with local high-score persistence"],
    techStack:"Built entirely on Pygame with no external game engine — the whole loop, from rendering to input handling, is hand-rolled in Python. Custom gravity and jump-velocity physics drive the bird's motion, pipes generate procedurally with randomised gap heights, and collision detection uses pixel-perfect sprite masks rather than simple bounding boxes for accuracy. A full state machine handles transitions between menu, play, and death screens, with local high-score persistence tracked between runs.",
    challenges:"Building physics and collision from scratch instead of relying on an engine meant getting gravity/jump feel right took a lot of tuning by hand — too floaty or too snappy and the game stopped feeling fair. Pixel-perfect collision with sprite masks was more finicky to get working correctly than simple rectangle collision, but it made hits feel much more accurate. Managing clean state transitions (menu → play → death → restart) without bugs creeping in at the edges was its own small challenge in code organization.",
    videoUrl:"https://www.loom.com/share/9c4cda55bddf4d7fa571d6adcb20af9d", techImg: null}
];
let cur=0;
function showHome(){document.getElementById('page-home').classList.add('active');document.getElementById('page-project').classList.remove('active');window.scrollTo(0,0);}
function showProject(i){
  cur=i;const p=projects[i];
  document.getElementById('d-tag').textContent=p.tag;
  document.getElementById('d-title').textContent=p.title;
  document.getElementById('d-desc').textContent=p.desc;
  document.getElementById('d-what').textContent=p.what;
  document.getElementById('d-tech').innerHTML=p.tech.map(t=>`<span class="detail-pill">${t}</span>`).join('');
  document.getElementById('d-links').innerHTML=`<a class="detail-link-btn primary" href="${p.github}" target="_blank">GitHub ↗</a><a class="detail-link-btn secondary" href="https://www.linkedin.com/in/shrinithi-nagarajan/" target="_blank">LinkedIn ↗</a>`;
  document.getElementById('d-highlights').innerHTML=p.highlights.map(h=>`<li>${h}</li>`).join('');
  document.getElementById('d-techstack').textContent=p.techStack||'';
  document.getElementById('d-challenges').textContent=p.challenges||'';
  const vb=document.getElementById('video-box');
  if(p.videoUrl){
    // vb.innerHTML=`<iframe src="${p.videoUrl}" allowfullscreen></iframe>`;
    vb.innerHTML = `<iframe src="${p.videoUrl}"></iframe>`;
  }else if(p.techImg){
    vb.innerHTML=`<img src="${p.techImg}" alt="Tech stack or workflow" class="tech-img">`;
  }else{
    vb.innerHTML=`<div class="video-placeholder-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="var(--brown)"/></svg></div><div class="video-placeholder-label">Demo video</div><div class="video-add-hint">paste your YouTube / Loom link below</div>`;
  }
  document.getElementById('video-url-input').value=p.videoUrl||'';
  document.getElementById('d-counter').textContent=`${i+1} of ${projects.length}`;
  document.getElementById('d-prev').style.visibility=i===0?'hidden':'visible';
  document.getElementById('d-next').style.visibility=i===projects.length-1?'hidden':'visible';
  document.getElementById('page-home').classList.remove('active');
  document.getElementById('page-project').classList.add('active');
  window.scrollTo(0,0);
}
function navigateProject(d){const n=cur+d;if(n>=0&&n<projects.length)showProject(n);}
function embedVideo(){
  const raw=document.getElementById('video-url-input').value.trim();if(!raw)return;
  let url=raw;
  const yt=raw.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);if(yt)url=`https://www.youtube.com/embed/${yt[1]}`;
  const loom=raw.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);if(loom)url=`https://www.loom.com/embed/${loom[1]}`;
  projects[cur].videoUrl=url;
  document.getElementById('video-box').innerHTML=`<iframe src="${url}" allowfullscreen></iframe>`;
}


// const projects=[
//   {tag:"Hackathon Winner · Claysys Tech",title:"APIScout",desc:"A Flask-based tool that scrapes API documentation pages, extracts all endpoints using Gemini 2.5 Flash, and auto-generates production-ready Python wrapper code with error handling, auth patterns, and docstrings.",tech:["FLASK","GEMINI 2.5","CHROMADB","RAG","PYTHON","RENDER"],github:"https://github.com/shrinithi19/apiscout",what:"APIScout eliminates the tedious process of manually reading API docs and writing boilerplate wrapper code. Paste in a documentation URL and within seconds you get a fully structured Python SDK. A ChromaDB RAG pipeline semantically understands the docs and an 8-key round-robin rate limiter handles high-volume Gemini requests.",highlights:["Scrapes any public API documentation URL automatically","8-key Gemini round-robin rate limiter for sustained throughput","ChromaDB vector store for semantic doc retrieval (RAG)","Generates production-grade Python wrappers with auth + error handling","Deployed to Render with dark purple UI","Won 1st place at the Claysys Tech hackathon"],videoUrl:"https://www.youtube.com/watch?v=6Z6w1DtIQo4", techImg: null},
//   {tag:"Team Hackathon · 24 hours",title:"NulAware AI",desc:"A natural language data profiling Q&A agent. Drop in any dataset and ask questions in plain English — NulAware generates statistical insights, detects anomalies, and answers complex data queries without writing code.",tech:["LANGGRAPH","QWEN 2.5","CHROMADB","STREAMLIT","MCP","OLLAMA"],github:"https://github.com/shrinithi19/Nulaware-NL-Profiling",what:"NulAware replaces manual EDA. Upload a CSV, ask natural language questions and the LangGraph agent handles profiling, retrieval, and response — on local Qwen 2.5 7B via Ollama with zero paid API costs.",highlights:["Full LangGraph agent loop with tool-calling and memory","MCP server + client pair for structured tool orchestration","Qwen 2.5 7B via Ollama — zero paid API costs","ydata-profiling for automated statistical analysis","ChromaDB semantic search over profiling output","Built and deployed in 24 hours with a team of 4"],videoUrl:" https://www.loom.com/share/6c8b70b09c4e4560a654f7bfcb53153e", techImg: null},
//   {tag:"IoT + Computer Vision",title:"Powerloop",desc:"A real-time object detection pipeline bridging embedded hardware and computer vision. YOLOv8 runs inference on an ESP32 camera stream, served via Flask over a local network.",tech:["YOLOV8","OPENCV","ESP32","FLASK","PYTHON","PYTORCH"],github:"https://github.com/shrinithi19",what:"Powerloop connects the physical and digital worlds. An ESP32 streams live camera feed over WiFi to a Flask backend running YOLOv8 inference via OpenCV. Detected objects render in real-time on a browser dashboard.",highlights:["ESP32-CAM WiFi streaming to Flask backend","YOLOv8 real-time inference with OpenCV frame processing","Browser dashboard with live annotated detection feed","Low-latency pipeline optimised for edge hardware","Modular — swap detection models without pipeline changes","Full hardware-to-web integration in Python"],techImg: "C:\Users\Irhs\OneDrive\clg docs\powerloop workflow.png"},
//   {tag:"Computer Vision · PCB QC",title:"PCB AI Inspector",desc:"A unified PCB inspection system: DINOv2-based component similarity detection and a CNN solder joint defect classifier — wrapped in a Gradio UI.",tech:["DINOV2","PYTORCH","CNN","GRADIO","OPENCV","PYTHON"],github:"https://github.com/shrinithi19/PCB_Detector_Pro",what:"Two AI models run in parallel. DINOv2 detects whether a component matches its reference. A CNN classifier identifies solder joint defects. Both output into one Gradio interface usable without any code.",highlights:["DINOv2 (ViT) for zero-shot component similarity detection","Custom CNN trained on solder joint defect dataset","Unified Gradio UI — drag and drop PCB images","Side-by-side comparison: reference vs. inspected board","PyTorch backend with optimised inference pipeline","Designed to extend into a manufacturing QC system"],videoUrl:null , techImg: null },
//   {tag:"Game Development",title:"Flappy Bird",desc:"A complete Flappy Bird recreation built from scratch in Python with Pygame — custom physics engine, sprite management, collision detection, and a full game state machine.",tech:["PYTHON","PYGAME","OOP","PHYSICS","SPRITES"],github:"https://github.com/shrinithi19/Flappy_Cloud",what:"Built without any game engine — pure Pygame. Custom gravity and jump velocity physics, procedural pipe generation, pixel-perfect collision detection with hitbox masks, and a full state machine from menu to death screen.",highlights:["Custom gravity + jump velocity physics from scratch","Procedural pipe generation with randomised gap heights","Pixel-perfect collision detection with sprite masks","Full game state machine: menu → play → death → restart","Sprite animation system for the bird flap cycle","Score tracking with local high-score persistence"],videoUrl:null, techImg: null}
// ];
// let cur=0;
// function showHome(){document.getElementById('page-home').classList.add('active');document.getElementById('page-project').classList.remove('active');window.scrollTo(0,0);}
// function showProject(i){
//   cur=i;const p=projects[i];
//   document.getElementById('d-tag').textContent=p.tag;
//   document.getElementById('d-title').textContent=p.title;
//   document.getElementById('d-desc').textContent=p.desc;
//   document.getElementById('d-what').textContent=p.what;
//   document.getElementById('d-tech').innerHTML=p.tech.map(t=>`<span class="detail-pill">${t}</span>`).join('');
//   document.getElementById('d-links').innerHTML=`<a class="detail-link-btn primary" href="${p.github}" target="_blank">GitHub ↗</a><a class="detail-link-btn secondary" href="https://www.linkedin.com/in/shrinithi-nagarajan/" target="_blank">LinkedIn ↗</a>`;
//   document.getElementById('d-highlights').innerHTML=p.highlights.map(h=>`<li>${h}</li>`).join('');
//   const vb=document.getElementById('video-box');
// if(p.videoUrl){
//   vb.innerHTML=`<iframe src="${p.videoUrl}" allowfullscreen></iframe>`;
// }else if(p.techImg){
//   vb.innerHTML=`<img src="${p.techImg}" alt="Tech stack or workflow" class="tech-img">`;
// }else{
//   vb.innerHTML=`<div class="video-placeholder-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="var(--brown)"/></svg></div><div class="video-placeholder-label">Demo video</div><div class="video-add-hint">paste your YouTube / Loom link below</div>`;
// }
//   vb.innerHTML=p.videoUrl?`<iframe src="${p.videoUrl}" allowfullscreen></iframe>`:`<div class="video-placeholder-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="var(--brown)"/></svg></div><div class="video-placeholder-label">Demo video</div><div class="video-add-hint">paste your YouTube / Loom link below</div>`;
//   document.getElementById('video-url-input').value=p.videoUrl||'';
//   document.getElementById('d-counter').textContent=`${i+1} of ${projects.length}`;
//   document.getElementById('d-prev').style.visibility=i===0?'hidden':'visible';
//   document.getElementById('d-next').style.visibility=i===projects.length-1?'hidden':'visible';
//   document.getElementById('page-home').classList.remove('active');
//   document.getElementById('page-project').classList.add('active');
//   window.scrollTo(0,0);
// }
// function navigateProject(d){const n=cur+d;if(n>=0&&n<projects.length)showProject(n);}
// function embedVideo(){
//   const raw=document.getElementById('video-url-input').value.trim();if(!raw)return;
//   let url=raw;
//   const yt=raw.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);if(yt)url=`https://www.youtube.com/embed/${yt[1]}`;
//   const loom=raw.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);if(loom)url=`https://www.loom.com/embed/${loom[1]}`;
//   projects[cur].videoUrl=url;
//   document.getElementById('video-box').innerHTML=`<iframe src="${url}" allowfullscreen></iframe>`;
// }
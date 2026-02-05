// Real technology icons URLs for development and ML libraries

export const getRealIconUrl = (name: string): string => {
  const iconMap: { [key: string]: string } = {
    // Frontend Frameworks
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    "Svelte": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    "Nuxt.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
    
    // Styling & UI
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg",
    "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    "Material UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    "Chakra UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-original.svg",
    "Styled Components": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/styledcomponents/styledcomponents-original.svg",
    "Sass": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    
    // Languages
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    
    // Backend & Runtime
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "Deno": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg",
    "NestJS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "Spring": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    
    // Databases
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    "Elasticsearch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
    "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    
    // Cloud & DevOps
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Google Cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    "Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "Terraform": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    "Jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    "Heroku": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    "Netlify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
    
    // Machine Learning & AI
    "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    "Keras": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    "Jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    "OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    "Hugging Face": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/huggingface/huggingface-original.svg",
    "MLflow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mlflow/mlflow-original.svg",
    
    // Data & Analytics
    "Apache Spark": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
    "Apache Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    "Databricks": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/databricks/databricks-original.svg",
    "Tableau": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
    "Power BI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg",
    "Grafana": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
    "Prometheus": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
    
    // Testing & Quality
    "Jest": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    "Cypress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
    "Selenium": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
    "Storybook": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
    
    // Tools & Utilities
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "GitLab": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    "Webpack": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    "Babel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
    "ESLint": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
    "Prettier": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
    "Yarn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
    "npm": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    
    // Mobile Development
    "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    "Android": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    "iOS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    
    // Blockchain & Web3
    "Ethereum": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
    "Solidity": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
    "Web3.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    
    // Other Technologies
    "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    "REST API": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    "WebRTC": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webrtc/webrtc-original.svg",
    "Prisma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    "Strapi": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg",
    "Wordpress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    "Shopify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg"
  };
  
  return iconMap[name] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg";
};

// Alternative function for lowercase matching
export const getRealIconUrlCaseInsensitive = (name: string): string => {
  const normalizedName = name.trim();
  return getRealIconUrl(normalizedName);
};

// Get all available technology names
export const getAllTechnologies = (): string[] => {
  return Object.keys({
    "React": "react",
    "Next.js": "nextjs",
    "Tailwind CSS": "tailwindcss",
    "Node.js": "nodejs",
    "Python": "python",
    "TypeScript": "typescript",
    "Vue.js": "vuejs",
    "Angular": "angularjs",
    "Svelte": "svelte",
    "JavaScript": "javascript",
    "Java": "java",
    "C++": "cplusplus",
    "Go": "go",
    "Rust": "rust",
    "PHP": "php",
    "Ruby": "ruby",
    "Swift": "swift",
    "Kotlin": "kotlin",
    "Express": "express",
    "Django": "django",
    "Flask": "flask",
    "Spring": "spring",
    "Laravel": "laravel",
    "PostgreSQL": "postgresql",
    "MongoDB": "mongodb",
    "MySQL": "mysql",
    "Redis": "redis",
    "Docker": "docker",
    "Kubernetes": "kubernetes",
    "AWS": "amazonwebservices",
    "TensorFlow": "tensorflow",
    "PyTorch": "pytorch",
    "Scikit-learn": "scikitlearn",
    "Pandas": "pandas",
    "NumPy": "numpy",
    "Git": "git",
    "GitHub": "github",
    "VS Code": "vscode",
    "Webpack": "webpack",
    "Vite": "vitejs",
    "React Native": "react",
    "Flutter": "flutter",
    "GraphQL": "graphql",
    "Socket.io": "socketio",
    "Prisma": "prisma"
  });
};

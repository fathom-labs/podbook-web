# 📚 Podbook - AI-Powered RSS to Book Converter

Transform any RSS feed into professionally formatted books using AI. Perfect for offline reading, content curation, and creating personalized reading experiences.

## 🎯 Project Status

### ✅ **COMPLETED FEATURES**
- **Backend Infrastructure**: Complete Express server with PostgreSQL database
- **Authentication System**: User registration, login, logout with JWT tokens
- **API Endpoints**: Full REST API for users, projects, content, and AI processing
- **Frontend Integration**: React app connected to backend with protected routes
- **User Management**: User profiles, authentication state, and session management
- **Development Environment**: Docker setup with hot reloading and debugging tools

### 🚧 **IN PROGRESS**
- Database table creation and migrations
- Real data integration (currently using mock responses)
- Core business logic implementation

### 📋 **REMAINING TO-DO**
- [ ] Prisma database migrations and table creation
- [ ] RSS feed processing and content extraction
- [ ] AI-powered content generation and book formatting
- [ ] File upload and processing
- [ ] Book export functionality (PDF, EPUB, etc.)
- [ ] User subscription and billing system
- [ ] Advanced project management features
- [ ] Content analytics and insights
- [ ] Production deployment and optimization

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **React Router** for navigation
- **React Query** for data fetching

### **Backend**
- **Node.js** with TypeScript
- **Express.js** web framework
- **PostgreSQL** database
- **Redis** for caching and queues
- **Prisma** ORM for database management
- **JWT** for authentication
- **Docker** for containerization

### **Development Tools**
- **Docker Compose** for local development
- **pgAdmin** for database management
- **ESLint** for code quality
- **Hot Module Reloading** for development

## 📁 Project Structure

```
inprint-story-weaver/
├── 📁 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/             # Shadcn/ui components
│   │   │   ├── LeftNavigation.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ApiTest.tsx     # API testing interface
│   │   ├── contexts/           # React contexts
│   │   │   ├── ThemeContext.tsx
│   │   │   └── AuthContext.tsx # Authentication state
│   │   ├── pages/              # Application pages
│   │   │   ├── Dashboard.tsx   # Main dashboard (protected)
│   │   │   ├── Login.tsx       # User login
│   │   │   ├── SignUp.tsx      # User registration
│   │   │   ├── Projects.tsx    # Project management
│   │   │   └── Settings.tsx    # User settings
│   │   ├── services/           # API services
│   │   │   └── api.ts          # Backend API integration
│   │   └── App.tsx             # Main application component
│   ├── package.json
│   └── vite.config.ts
│
├── 📁 Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.ts     # PostgreSQL connection
│   │   │   └── redis.ts        # Redis configuration
│   │   ├── controllers/        # Request handlers
│   │   │   └── auth.ts         # Authentication logic
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.ts         # JWT verification
│   │   │   ├── validation.ts   # Request validation
│   │   │   └── errorHandler.ts # Error handling
│   │   ├── routes/             # API route definitions
│   │   │   ├── auth.ts         # Authentication routes
│   │   │   ├── users.ts        # User management
│   │   │   ├── projects.ts     # Project management
│   │   │   ├── content.ts      # Content management
│   │   │   └── ai.ts           # AI processing routes
│   │   ├── utils/              # Utility functions
│   │   │   └── logger.ts       # Logging utilities
│   │   └── index.ts            # Main server file
│   ├── prisma/                 # Database schema and migrations
│   │   └── schema.prisma       # Database models
│   ├── docker-compose.yml      # Docker services
│   ├── Dockerfile              # Backend container
│   └── package.json
│
└── 📁 Documentation
    ├── README.md               # This file
    └── backend/README.md       # Backend-specific docs
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd inprint-story-weaver
```

### **2. Start Backend Services**
```bash
cd backend

# Start Docker services (PostgreSQL, Redis, pgAdmin)
docker-compose up -d

# Install dependencies
npm install

# Start development server
npm run dev
```

**Backend will be available at:** http://localhost:3000

### **3. Start Frontend**
```bash
# In a new terminal, from project root
npm install
npm run dev
```

**Frontend will be available at:** http://localhost:8080

### **4. Verify Installation**
- **Backend Health Check:** http://localhost:3000/health
- **API Test Page:** http://localhost:8080/api-test
- **Database Admin:** http://localhost:5050 (pgAdmin)

## 🔧 Development Workflow

### **Backend Development**
```bash
cd backend

# Start development server with hot reload
npm run dev

# Run database migrations (when ready)
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Run tests
npm test
```

### **Frontend Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

### **Database Management**
```bash
cd backend

# Access PostgreSQL directly
docker exec -it podbook_postgres psql -U podbook_user -d podbook

# Open pgAdmin
# Visit http://localhost:5050
# Email: admin@podbook.com
# Password: admin123
```

## 🔐 Authentication Flow

### **User Registration**
1. Visit `/signup`
2. Fill in name, email, and password
3. User is created and automatically logged in
4. Redirected to dashboard

### **User Login**
1. Visit `/login`
2. Enter email and password
3. JWT token is stored in localStorage
4. Redirected to dashboard

### **Protected Routes**
- Dashboard, Projects, Settings require authentication
- Unauthenticated users are redirected to login
- JWT tokens are automatically managed

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### **Users**
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/profile` - Get current user profile

### **Projects**
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project

### **Content**
- `GET /api/content` - List all content
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create new content

### **AI Processing**
- `GET /api/ai` - Get processing status
- `POST /api/ai/process` - Submit AI job
- `GET /api/ai/:id` - Get job status

## 🐳 Docker Services

### **PostgreSQL Database**
- **Port:** 5433 (host) → 5432 (container)
- **Database:** podbook
- **User:** podbook_user
- **Password:** podbook_password

### **Redis Cache**
- **Port:** 6379
- **Purpose:** Caching and job queues

### **pgAdmin**
- **Port:** 5050
- **Email:** admin@podbook.com
- **Password:** admin123

### **Backend API**
- **Port:** 3000
- **Environment:** Development with hot reload

## 🔍 Testing & Debugging

### **API Testing**
Visit http://localhost:8080/api-test to test all API endpoints

### **Database Testing**
```bash
cd backend
node test-direct.js      # Test direct database connection
node test-express-db.js  # Test Express database connection
```

### **Backend Logs**
```bash
# View backend logs
docker logs podbook_backend

# View database logs
docker logs podbook_postgres
```

## 🚨 Troubleshooting

### **Common Issues**

#### **Database Connection Failed**
```bash
# Check if Docker is running
docker ps

# Restart Docker services
cd backend
docker-compose down
docker-compose up -d
```

#### **Port Already in Use**
```bash
# Kill processes using ports
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

#### **Frontend Can't Connect to Backend**
- Verify backend is running on port 3000
- Check CORS configuration
- Ensure no firewall blocking localhost

### **Reset Everything**
```bash
# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

## 📈 Next Development Steps

### **Immediate (Next 1-2 days)**
1. **Database Setup**
   - Run Prisma migrations
   - Create actual database tables
   - Replace mock responses with real data

2. **Authentication Middleware**
   - Add JWT verification to protected API routes
   - Implement user role-based access control

### **Short Term (Next 1-2 weeks)**
1. **Core Business Logic**
   - RSS feed processing
   - Content extraction and parsing
   - AI content generation

2. **File Management**
   - File upload handling
   - Document processing
   - Storage management

### **Medium Term (Next 1-2 months)**
1. **Book Generation**
   - PDF/EPUB export
   - Formatting and styling
   - Quality assurance

2. **Advanced Features**
   - User subscriptions
   - Analytics and insights
   - Collaboration tools

## 🤝 Contributing

### **Development Guidelines**
- Follow TypeScript best practices
- Use consistent code formatting
- Write meaningful commit messages
- Test all changes thoroughly

### **Code Style**
- Use functional components with hooks
- Implement proper error handling
- Follow REST API conventions
- Maintain consistent naming conventions

## 📄 License

[Your License Here]

## 🆘 Support

For development questions or issues:
1. Check the troubleshooting section above
2. Review the API test page at `/api-test`
3. Check Docker logs for backend issues
4. Verify all services are running

---

**Last Updated:** August 21, 2024  
**Version:** 1.0.0-alpha  
**Status:** Development - Core Infrastructure Complete ✅

# Environment Variables

This project uses environment variables for configuration. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

## Required Variables

- `VITE_GRAPHQL_API_URL`: The GraphQL API endpoint URL
- `VITE_PODIUM_API_TOKEN`: The Podium API authentication token
- `VITE_API_BASE_URL`: The backend API base URL

## Security Note

Never commit the `.env` file to version control. The `.env` file is already included in `.gitignore`.


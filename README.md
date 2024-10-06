# AI Gmail - Intelligent Email Management

## Description
AI Gmail is an innovative web application that revolutionizes email management using artificial intelligence. Built with modern web technologies, this platform integrates seamlessly with Gmail to provide smart email handling, automated responses, and AI-powered composing. Whether you're a busy professional looking to streamline your inbox or someone seeking to enhance their email communication, AI Gmail offers an intuitive and powerful solution to email overload.

## Features
- 🧠 AI-powered email categorization and prioritization
- 🤖 Automated smart replies and suggestions
- ✍️ AI-assisted email composition
- 📊 Intelligent email analytics and insights
- 🔒 Secure authentication with Gmail integration
- 📱 Responsive design for desktop and mobile use

## Technologies Used
- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Drizzle](https://github.com/drizzle-team/drizzle-orm) - Lightweight and performant ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs made easy

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- A Gmail account
- Google Cloud Platform account (for API access)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-gmail.git
   cd ai-gmail
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following you can disable Google client and using clerk:
   ```
   DATABASE_URL="your_database_connection_string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. Set up the database:
   ```
   npx prisma db push
   ```

5. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Sign In**: 
   - Use your Gmail account to sign in to the application.
   - Grant necessary permissions for AI Gmail to access your email data.

2. **Dashboard**: 
   - View your email statistics and AI-generated insights.
   - Access different features like smart compose, auto-reply, and email categorization.

3. **Smart Compose**:
   - Start writing an email and let AI suggest completions and improvements.
   - Use AI-generated templates for common email types.

4. **Auto-Reply**:
   - Set up rules for automatic replies to certain types of emails.
   - Customize AI-generated responses before sending.

5. **Email Management**:
   - Use AI to categorize and prioritize your emails automatically.
   - Get suggestions for quick actions on emails (archive, delete, respond).

6. **Analytics**:
   - View insights on your email habits and productivity.
   - Get AI-powered suggestions to improve your email efficiency.

## Contributing

We welcome contributions to AI Gmail! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for providing the AI models powering our smart features.
- [Google](https://developers.google.com/) for Gmail API and authentication services.
- All open-source contributors whose libraries and tools made this project possible.

---

For any questions or support, please open an issue in the GitHub repository or contact our team at yusrilprayoga90@gmail.com.
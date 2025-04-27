class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background image
          Image.asset(
            'assets/images/background.jpg',
            fit: BoxFit.cover,
            height: double.infinity,
            width: double.infinity,
          ),
          
          // Content
          Center(
            child: Container(
              width: double.infinity,
              margin: const EdgeInsets.symmetric(horizontal: 32),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.85),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Logo
                  Container(
                    padding: const EdgeInsets.all(5),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.red, width: 2),
                      color: Colors.green,
                    ),
                    child: Image.asset(
                      'assets/images/dtet_logo.png',
                      height: 100,
                      width: 100,
                    ),
                  ),
                  
                  const SizedBox(height: 25),
                  
                  // Username field
                  TextField(
                    decoration: const InputDecoration(
                      hintText: 'Username',
                    ),
                  ),
                  
                  const SizedBox(height: 16),
                  
                  // Password field
                  TextField(
                    obscureText: true,
                    decoration: const InputDecoration(
                      hintText: 'Password',
                    ),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Sign in button
                  ElevatedButton(
                    onPressed: () {
                      // Handle login
                    },
                    child: const Text(
                      'SIGN IN',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                  
                  const SizedBox(height: 12),
                  
                  // Forgot password link
                  TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/forgot-password');
                    },
                    child: const Text(
                      'Forget password?',
                      style: TextStyle(
                        color: Colors.black87,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
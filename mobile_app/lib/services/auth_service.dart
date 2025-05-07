import 'package:firebase_auth/firebase_auth.dart';
import 'package:logging/logging.dart';

class AuthService {
  // Singleton pattern
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal() {
    Logger.root.level = Level.ALL;
    Logger.root.onRecord.listen((record) {
      // ignore: avoid_print
      print('${record.level.name}: ${record.time}: ${record.message}');
    });
  }

  final _logger = Logger('AuthService');
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Authentication state
  bool get isAuthenticated => _auth.currentUser != null;

  // Authentication methods
  Future<bool> signIn(String email, String password) async {
    try {
      await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return true;
    } on FirebaseAuthException catch (e) {
      _logger.severe('Sign in error: ${e.message}');
      return false;
    }
  }

  Future<bool> signUp(String email, String password) async {
    try {
      await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      return true;
    } on FirebaseAuthException catch (e) {
      _logger.severe('Sign up error: ${e.message}');
      return false;
    }
  }

  Future<void> signOut() async {
    try {
      await _auth.signOut();
    } on FirebaseAuthException catch (e) {
      _logger.severe('Sign out error: ${e.message}');
    }
  }

  Future<bool> resetPassword(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
      return true;
    } on FirebaseAuthException catch (e) {
      _logger.severe('Password reset error: ${e.message}');
      return false;
    }
  }
} 
// Core application class
class App {
  constructor() {
    this.currentUser = null;
    this.initFirebase();
    this.initUI();
    this.setupEventListeners();
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.provider = new firebase.auth.GoogleAuthProvider();
    
    // Auth state listener
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        // User is signed in
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        this.updateUserProfile(user);
      } else {
        // User is signed out
        document.getElementById('auth-container').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
      }
    });
  }

  initUI() {
    // Create Google Sign-In button
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
          <h1 class="text-2xl font-bold mb-6">Welcome to Zone Flow</h1>
          <button id="googleSignIn" class="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center w-full hover:bg-gray-50 transition">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" class="h-5 mr-2">
            Sign in with Google
          </button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'googleSignIn' || e.target.closest('#googleSignIn')) {
        this.handleGoogleSignIn();
      }
    });
  }

  async handleGoogleSignIn() {
    try {
      await this.auth.signInWithPopup(this.provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Sign in failed. Please try again.');
    }
  }

  updateUserProfile(user) {
    const nameElement = document.querySelector('#user-name');
    if (nameElement) {
      nameElement.textContent = user.displayName || 'User';
    }
  }

  initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'coffee';
    document.documentElement.classList.add(`${savedTheme}-theme`);
    
    // Create theme switcher in settings
    const themeSwitcher = document.createElement('div');
    themeSwitcher.innerHTML = `
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">Theme</h3>
        <button class="theme-btn coffee-theme-btn p-2 rounded-lg border" data-theme="coffee">
          <div class="w-8 h-8 rounded-full bg-coffee-primary"></div>
          <span class="ml-2">Coffee</span>
        </button>
      </div>
    `;
    document.getElementById('settings-container').appendChild(themeSwitcher);
    
    // Add theme switch event listeners
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.documentElement.className = '';
        document.documentElement.classList.add(`${theme}-theme`);
        localStorage.setItem('theme', theme);
      });
    });
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

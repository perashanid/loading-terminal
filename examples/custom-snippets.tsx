// Custom Code Snippets Example
import React, { useState } from 'react';
import { LoadingScreen, CodeSnippet } from '../src';
import '../src/styles/loading-screen.css';

// Define your custom code snippets
const customCodeSnippets: CodeSnippet[] = [
  {
    language: 'javascript',
    filename: 'api-client.js',
    code: `class APIClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    };
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: this.headers,
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return { success: false, error: error.message };
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Usage example
const client = new APIClient('https://api.example.com', 'your-api-key');

async function loadUserData() {
  const result = await client.get('/users/me');
  
  if (result.success) {
    console.log('User data:', result.data);
    return result.data;
  } else {
    console.error('Failed to load user data:', result.error);
    return null;
  }
}`,
    typingSpeed: 25
  },
  {
    language: 'python',
    filename: 'data_processor.py',
    code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.is_fitted = False
    
    def load_data(self, file_path):
        """Load data from CSV file"""
        try:
            self.data = pd.read_csv(file_path)
            print(f"Data loaded successfully: {self.data.shape}")
            return self.data
        except Exception as e:
            print(f"Error loading data: {e}")
            return None
    
    def clean_data(self, df):
        """Clean and preprocess the data"""
        # Remove duplicates
        df_clean = df.drop_duplicates()
        
        # Handle missing values
        numeric_columns = df_clean.select_dtypes(include=[np.number]).columns
        df_clean[numeric_columns] = df_clean[numeric_columns].fillna(
            df_clean[numeric_columns].mean()
        )
        
        # Handle categorical missing values
        categorical_columns = df_clean.select_dtypes(include=['object']).columns
        df_clean[categorical_columns] = df_clean[categorical_columns].fillna(
            df_clean[categorical_columns].mode().iloc[0]
        )
        
        print(f"Data cleaned: {df_clean.shape}")
        return df_clean
    
    def feature_engineering(self, df, target_column):
        """Create new features and prepare data for modeling"""
        # Separate features and target
        X = df.drop(columns=[target_column])
        y = df[target_column]
        
        # Encode categorical variables
        X_encoded = pd.get_dummies(X, drop_first=True)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X_encoded, y, test_size=0.2, random_state=42
        )
        
        # Scale the features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.is_fitted = True
        
        return X_train_scaled, X_test_scaled, y_train, y_test
    
    def get_feature_importance(self, model, feature_names):
        """Get feature importance from trained model"""
        if hasattr(model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': feature_names,
                'importance': model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df
        else:
            print("Model doesn't support feature importance")
            return None

# Usage example
processor = DataProcessor()
data = processor.load_data('dataset.csv')
clean_data = processor.clean_data(data)
X_train, X_test, y_train, y_test = processor.feature_engineering(clean_data, 'target')`,
    typingSpeed: 20
  },
  {
    language: 'typescript',
    filename: 'state-machine.ts',
    code: `interface State {
  name: string;
  onEnter?: () => void;
  onExit?: () => void;
  transitions: { [event: string]: string };
}

interface StateMachineConfig {
  initialState: string;
  states: { [stateName: string]: State };
}

class StateMachine {
  private currentState: string;
  private states: { [stateName: string]: State };
  private listeners: { [event: string]: Array<(data?: any) => void> } = {};

  constructor(config: StateMachineConfig) {
    this.states = config.states;
    this.currentState = config.initialState;
    
    // Enter initial state
    const initialState = this.states[this.currentState];
    if (initialState?.onEnter) {
      initialState.onEnter();
    }
  }

  getCurrentState(): string {
    return this.currentState;
  }

  canTransition(event: string): boolean {
    const state = this.states[this.currentState];
    return event in state.transitions;
  }

  transition(event: string, data?: any): boolean {
    const currentState = this.states[this.currentState];
    
    if (!this.canTransition(event)) {
      console.warn(\`Cannot transition from \${this.currentState} with event \${event}\`);
      return false;
    }

    const nextStateName = currentState.transitions[event];
    const nextState = this.states[nextStateName];

    if (!nextState) {
      console.error(\`State \${nextStateName} does not exist\`);
      return false;
    }

    // Exit current state
    if (currentState.onExit) {
      currentState.onExit();
    }

    // Update current state
    const previousState = this.currentState;
    this.currentState = nextStateName;

    // Enter new state
    if (nextState.onEnter) {
      nextState.onEnter();
    }

    // Emit transition event
    this.emit('transition', {
      from: previousState,
      to: this.currentState,
      event,
      data
    });

    return true;
  }

  on(event: string, callback: (data?: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: (data?: any) => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

// Example: Loading State Machine
const loadingStateMachine = new StateMachine({
  initialState: 'idle',
  states: {
    idle: {
      name: 'Idle',
      transitions: {
        START_LOADING: 'loading'
      }
    },
    loading: {
      name: 'Loading',
      onEnter: () => console.log('Started loading...'),
      transitions: {
        LOADING_SUCCESS: 'success',
        LOADING_ERROR: 'error',
        CANCEL: 'idle'
      }
    },
    success: {
      name: 'Success',
      onEnter: () => console.log('Loading completed successfully!'),
      transitions: {
        RESET: 'idle'
      }
    },
    error: {
      name: 'Error',
      onEnter: () => console.log('Loading failed!'),
      transitions: {
        RETRY: 'loading',
        RESET: 'idle'
      }
    }
  }
});

// Usage
loadingStateMachine.on('transition', (data) => {
  console.log(\`Transitioned from \${data.from} to \${data.to}\`);
});

loadingStateMachine.transition('START_LOADING');
// Simulate async operation
setTimeout(() => {
  loadingStateMachine.transition('LOADING_SUCCESS');
}, 2000);`,
    typingSpeed: 22
  }
];

function CustomSnippetsExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={7000} // Longer duration for more complex code
          brandText="Loading Custom Application..."
          codeSnippets={customCodeSnippets}
        />
      )}
      
      {!isLoading && (
        <div className="main-content" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Custom Code Loading Complete!</h1>
          <p>Your custom algorithms have been loaded and processed.</p>
          <button 
            onClick={() => setIsLoading(true)}
            style={{
              padding: '0.5rem 1rem',
              background: '#64ffda',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            Reload with Custom Snippets
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomSnippetsExample;
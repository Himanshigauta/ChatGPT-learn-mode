import streamlit as st
import streamlit.components.v1 as components
import os

# Set Streamlit page configurations
st.set_page_config(
    page_title="ChatGPT Learn Mode",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Custom CSS to force absolute edge-to-edge fullscreen and prevent any outer/blank page scrolling
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Lock the Streamlit host page viewport */
    html, body, [data-testid="stAppViewContainer"] {
        overflow: hidden !important;
        height: 100vh !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: #0d0d0d !important;
    }
    
    /* Remove default Streamlit container padding */
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
        height: 100vh !important;
        overflow: hidden !important;
    }
    
    /* Force Streamlit iframe wrapper to be full screen */
    .element-container, .stHtml, iframe {
        width: 100% !important;
        height: 100vh !important;
        min-height: 100vh !important;
        border: none !important;
        display: block !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    </style>
""", unsafe_allow_html=True)

# Dynamically compile static assets into a single self-contained HTML page
def compile_application():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Load index.html
        html_path = os.path.join(base_dir, "index.html")
        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()
            
        # Load styles.css
        css_path = os.path.join(base_dir, "styles.css")
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
            
        # Load mock_data.js
        mock_path = os.path.join(base_dir, "mock_data.js")
        with open(mock_path, "r", encoding="utf-8") as f:
            mock_content = f.read()
            
        # Load app.js
        app_path = os.path.join(base_dir, "app.js")
        with open(app_path, "r", encoding="utf-8") as f:
            app_content = f.read()
            
        # Inline assets into index.html
        compiled_html = html_content.replace(
            '<link rel="stylesheet" href="styles.css">',
            f"<style>\n{css_content}\n</style>"
        )
        compiled_html = compiled_html.replace(
            '<script src="mock_data.js"></script>',
            f"<script>\n{mock_content}\n</script>"
        )
        compiled_html = compiled_html.replace(
            '<script src="app.js"></script>',
            f"<script>\n{app_content}\n</script>"
        )
        
        return compiled_html
    except Exception as e:
        return f"<h3>Error compiling ChatGPT Learn Mode: {str(e)}</h3>"

# Compile and render in fullscreen iframe component with outer scrolling disabled
compiled_app = compile_application()
components.html(compiled_app, height=1000, scrolling=False)

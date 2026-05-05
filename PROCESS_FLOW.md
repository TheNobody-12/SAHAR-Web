
# 🌊 How SAHAHR Works: A Simple Flow

This chart visualizes how Users, Admins, and Developers interact with the SAHAHR platform.

```mermaid
graph TD
    %% Define Styles for a prettier look
    classDef userNode fill:#E3F2FD,stroke:#1E88E5,stroke-width:2px,color:#0D47A1,rx:10,ry:10
    classDef adminNode fill:#FFF3E0,stroke:#FB8C00,stroke-width:2px,color:#BF360C,rx:10,ry:10
    classDef devNode fill:#E8F5E9,stroke:#43A047,stroke-width:2px,color:#1B5E20,rx:10,ry:10
    classDef systemNode fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,stroke-dasharray: 5 5,color:#4A148C,rx:5,ry:5

    subgraph Public_Experience [ 🌍 The Public Experience ]
        direction TB
        Visitor((👤 VSITOR)):::userNode
        Website[🖥️ Browses Website\nHome, Events, About Us]:::userNode
        Contact[✉️ Fills Forms\nContact / Newsletter]:::userNode
        
        Visitor --> Website
        Visitor --> Contact
    end

    subgraph Content_Management [ ✍️ Content Admin ]
        direction TB
        Admin((👑 ADMIN)):::adminNode
        Studio[🎨 Enters Studio\n/studio]:::adminNode
        Update[📝 Updates Content\nEvents, Board, Blog]:::adminNode
        Publish[🚀 Publishes]:::adminNode
        
        Admin --> Studio
        Studio --> Update
        Update --> Publish
    end

    subgraph Development [ 🛠️ Development ]
        direction TB
        Dev((💻 DEVELOPER)):::devNode
        Code[⌨️ Writes Code\nNext.js & Design]:::devNode
        Git[📦 Pushes to GitHub]:::devNode
        
        Dev --> Code
        Code --> Git
    end

    subgraph Infrastructure [ ⚙️ The Engine ]
        Sanity[(☁️ Sanity Data Lake\nNew Content Saved Here)]:::systemNode
        Vercel[⚡ Vercel Cloud\nBuilds & Deploys Site]:::systemNode
        
        Publish -.-> Sanity
        Git -.-> Vercel
        Vercel -.-> Website
        Sanity -.-> Website
    end

    %% Key Connections
    Publish == "Updates Data" ==> Sanity
    Git == "Triggers Build" ==> Vercel
    
    %% Layout adjustments
    linkStyle default stroke-width:2px,fill:none,stroke:#555
```

## 🗝️ Key Takeaways

1. **Visitors** enjoy the live site, which pulls fresh content dynamically.
2. **Admins** use the friendly `/studio` interface to add events or edit text without touching code.
3. **Developers** handle the technical side; pushing code changes to GitHub automatically updates the live site via **Vercel**.
4. **Sanity** acts as the central brain for content, feeding data to the website instantly.

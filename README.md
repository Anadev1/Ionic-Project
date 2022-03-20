# Report on Mobile Application Development  project - “GoWalkies” 

![unnamed](https://user-images.githubusercontent.com/55578973/159163034-2527b381-2e25-4f39-a6e2-1e426acf6b0a.jpg)


## Authors: Sandra Nielsen, Ana Iacovache, Rinjea Bianca  
        
### 1.1  Description of the app <br>
Dogs are a therapeutic gift from God to us humans. Statistics suggest that over 44% of Americans own a dog, which supports our claim. Dogs are true friends of humans, and people appreciate this quality of dogs, which is why they strive to give everything they want. This also creates an opportunity for on-demand dog walking applications. After a long day of work, a person comes home and finds his dog standing at the door with the excitement of going for a walk. Since the person is exhausted, it becomes difficult for him to live up to his daily expectations. However, dogs need to be taken care of by people and therefore on-demand GoWalkies  app  give you a solution.

### 1.2 Concept & Idea<br>
GoWalkies  is a smartphone application designed for  dog owners when they don’t have time to walk their pet/s and  also provides a boost of serotonin to dog lovers.
GoWalkies primary goal is to have an application where the pet parent gets what they’re looking for dog walkers.
The owners can make dog walks reservations, make a profile with their  information and dog/dogs information  and can take a picture of their dog.

### 1.3 How does GoWalkies work<br>
The working procedure of this app  is quite routine and easy to perform. First of all, the owner of the dog must register with sufficient details about him and his pet. There is an option to add additional details about the dog, such as its breed, name, more informations, etc. now, as the recording is done, he can look for a dog walker near him .
Nowadays, dog walking apps are becoming more and more popular among dog owners and there is every reason to be, as it i<strong>s a </strong>great platform to spend time with dogs in addition to making money.

### 2. Design choices<br>
Our project goal was to  design a mobile application that is easy and user friendly, that helps the pet owners to find services like dog walkers.

![unnamed](https://user-images.githubusercontent.com/55578973/159163085-9eb8faf6-3986-4cd2-baeb-c0f4e70060d4.png)

### 2.1 Information architecture<br>

![unnamed (1)](https://user-images.githubusercontent.com/55578973/159163109-9f5a7fec-a576-4c27-b03b-e062e1fbb45f.png)

### 2.2 Medium fidelity wireframes:<br>

![unnamed (1)](https://user-images.githubusercontent.com/55578973/159163195-35d849e7-f2e7-4e47-adab-813b916a2a74.jpg)
![unnamed (2)](https://user-images.githubusercontent.com/55578973/159163201-663b81aa-027e-4c6e-a183-fb2ff72ba485.jpg)
![unnamed (3)](https://user-images.githubusercontent.com/55578973/159163203-cd4cdeac-7d60-413a-a270-b1bb5de1dc19.jpg)
![unnamed (4)](https://user-images.githubusercontent.com/55578973/159163204-09000886-c98e-4249-aa6d-b190a3245a66.jpg)
![unnamed (5)](https://user-images.githubusercontent.com/55578973/159163205-e2d09f34-08f5-47fd-be67-60488d43a744.jpg)
![unnamed (6)](https://user-images.githubusercontent.com/55578973/159163210-cdea84d3-6701-4e61-a796-56d48bf3553d.jpg)

### 2.3 Visuals:<br>

![unnamed (2)](https://user-images.githubusercontent.com/55578973/159163248-30ea9078-357f-4e36-8761-e2e41b9e94ac.png)
![unnamed (3)](https://user-images.githubusercontent.com/55578973/159163252-757bf09c-dc5e-4f23-b717-06dc1f084ca9.png)
![unnamed (4)](https://user-images.githubusercontent.com/55578973/159163254-e715e068-a987-4c2c-bc26-4ec7610b4713.png)

### 2.4 Discoverability<br>
Basically, if the user can't find it, it doesn't exist. It should be clear  what actions are possible in a user interface in less than a microsecond - for example, labeling icons as best practice. Unlabeled icons are tantamount to throwing obstacles in the way of a user, as they will have to stop to decipher the meaning. 
To remove assumptions we labeled the icons from the tab menu

![unnamed (5)](https://user-images.githubusercontent.com/55578973/159163257-437569d5-39f3-42cb-88b7-1f404a39c074.png)

### 4. Project structure and “Thinking in React”<br>
Regarding our project structure, we have used the separation of concerns, where each section in the project addresses a different part of the application. For example, in our project we had our pages, components, images, fonts and the main css file with the variables from the Ionic template in their own separate folders. Although we have the styling for each page in the same folder as the pages, initiated with the same name.<br><br>
While making a fast design for our application, we were already thinking about how we could break up our application into smaller components.But since, our application is small and has only a few features, we have created as components the post cards that we see on the homepage, the dogs in the profile page, the forms for creating users, posts and adding dogs and some other elements that have to do with the ones mentioned above. Then we also created our firebase database accordingly to accommodate the users, dogs and posts.<br><br>
Moving forward, all three of us have worked on developing a static version of the application without any state or dynamic data from the database, just so that we could have a structure from where we could build onwards. From here we could figure out where we need to add state and which elements need to use it. In our case it was, of course, the user creation form which can also be edited afterwards, the creation of dogs and the creation and editing of posts. Then, we had to figure out where our state should live in the application. For example, the flow of creating a post consists of the post form, the post card and the add post page and the homepage. In order for it to work, we needed to find the highest of these in the hierarchy and that was the post form.

### 5. How to run the app in the browser and on a platforms (Android/iOS) & CLI commands <br>
**Ionic installation**<br>
npm install -g @ionic/cli<br>
ionic serve<br>

**Firebase installation**<br>
Firebase SDK:<br>
npm install firebase<br>
Realtime database:<br>
npm install @firebase/database<br>

**Capacitor**<br>
npm install @capacitor/core<br>
npm install @capacitor/ cli --save-dev<br>

**Capacitor camera API:**<br>
npm install @capacitor/camera<br>
npx cap sync<br>

**Capacitor toast API:**<br>
npm install @capacitor/toast<br>
npx cap sync<br>

**Android studio**<br>
Add android project:<br>
ionic capacitor add android<br>
Sync project:<br>
ionic capacitor sync android<br>
Open project in android studio:<br>
ionic capacitor open android<br>
Live-reload:<br>
ionic capacitor run android -l --external<br>



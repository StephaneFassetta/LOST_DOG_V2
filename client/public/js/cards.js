const GOOD_GUY = 0;
const BAD_GUY = 1;

const cards = [
    {
        "id": 1,
        "name": "Chien perdu",
        "description": "Chaque nuit, le chien perdu emmène une personne dans la forêt pour l'attacher à un arbre et le tuer...",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 2,
        "name": "Taxidermiste",
        "description": "Le taxidermiste peut capturer une personne et l'immobiliser pour la nuit. <br> La personne immobilisé ne peut pas utiliser sa compétence (si il en posséde une), ou voter contre quelqu'un si c'est un chien perdu.",
        "skills" : {"pros" : [{"libelle" : "Peut empailler une personne morte, elle reviendra à la vie deux nuit plus tard.", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : GOOD_GUY
    },
    {
        "id": 3,
        "name": "Pisteur des montagnes",
        "description": "Le pisteur peut suivre les traces de n'importe qui à la tomber de la nuit. <br> Si la personne suivi a été précédemment attachée dans la forêt par les chiens perdus elle est détachée et survit à la nuit. <br> Si le pisteur suit une personne qui n'est pas capturé, il découvre sa carte.",
        "skills" : {"pros" : [{"libelle" : "", when: "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 4,
        "name": "Habitant",
        "description": "Les habitants sont innoffensif et ne peuvent rien faire sauf voter.",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 5,
        "name": "Prêtre",
        "description": "Il forme des couples. Il choisit deux personnes qui seront lié par le mariage, lorsque l'un des deux meurt l'amant se suicide de chagrin. <br> Si le couple remporte la partie le prêtre est également vainqueur.",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 6,
        "name": "Geek",
        "description": "Le/la geek est ultra connectée et elle a l'habitude des nuits blanches. Lorsque la nuit tombe il/elle peut choisir de faire une nuit blanche en programment et en jouant toute la nuit. Enfermée dans sa chambre, elle devient inatteignable pour les/le chien(s) perdu(s).La geek ne peut faire de nuit blanche qu'une seule fois toutes les deux nuit. Mais la geek est aussi une féru de gadget. Si elle est emmenée dans la forêt juste après une nuit blanche. Elle peut prendre en photo le chien perdu discrètement avant de mourir. Cette photo pourra être uniquement envoyée au pisteur des montagnes qui sera le seul à savoir exactement qui se cache derrière un des chiens perdu.",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 7,
        "name": "Sans-abri",
        "description": "Le sans-abris a eu une vie difficile.<br> Il se contente de ce qu'il trouve. Si il est tuer au premier tour par les chiens perdu, sa rancœur envers les humains le poussera a revenir se venger, il rejoindra donc les chiens. <br> Si il survit à la première nuit, il pourra durant le second tour choisir la maison d'un défunt. Le sans-abris aura la possibilité d'usurper l'identité de l'habitant et hérite donc de ses compétences.",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    },
    {
        "id": 8,
        "name": "Jack l'égorgeur",
        "description": "Jack est solitaire. Son but est de tuer quiconque se mettra sur sa route. <br> Chaque nuit il choisit une personne a tuer, son objectif est d'être le dernier en vie.",
        "skills" : {"pros" : [{"libelle" : "Vote pour tuer une personne toutes les nuits", "when" : "night", "frequency" : 1}], "crons" : []},
        "side" : BAD_GUY
    }
];

export default cards;
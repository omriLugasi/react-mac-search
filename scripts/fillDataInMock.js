const fs = require('fs')



const createPageExamples = () => {

    const basicItem = {
        "widgetType": "page",
        "name": "Downloads",
        "action": {
            "name": "moveToDownloadPage",
            "props": {}
        },
        "widgetData": {
            "pageIcon": "__page__",
            "description": "Page that you can download all your assets",
            "details": [
                {
                    "name": "Available files",
                    "value": "5 files waiting for you"
                },
                {
                    "name": "Assets Bank",
                    "value": "29827172"
                }
            ]
        }
    }

    const names = new Array(500).fill(0).map((_, index) => [
        `Downloads${index}`, `contact Us${index}`, `Portfolio${index}`,
        `Followers${index}`, `Assets${index}`, `My Orders${index}`, `My place${index}`,
        `Settings${index}`
    ]).flat()

    const description = [
        'This is description text',
        'This is description text1',
        'This is description text2',
        'This is description text3',
        'This is description text4',
        'This is description very very very very long text',
    ]


    const details = [
        [
            {
                "name": "Available files",
                "value": "5 files waiting for you"
            },
            {
                "name": "Assets Bank",
                "value": "29827172"
            }
        ],
        [
            {
                "name": "Last modified",
                "value": new Date().toISOString()
            },
            {
                "name": "Assets Bank",
                "value": "29827172"
            }
        ],
        [
            {
                "name": "Available files",
                "value": "5 files waiting for you"
            },
            {
                "name": "Replica Name",
                "value": "Rose Linting black"
            }
        ]
    ]

    return names.reduce((acc, currentName) => {
        const item = {
            ...basicItem,
            name: currentName,
            widgetData: {
                ...basicItem.widgetData,
                description: description[Math.floor(Math.random() * description.length)],
                details: details[Math.floor(Math.random() * details.length)]
            }
        }
        acc.push(item)
        return acc
    }, [])

}


const init = () => {

    const data = createPageExamples()
    fs.writeFileSync('./src/mock/mockTest1.json', JSON.stringify(data, null, 4), { encoding: 'utf-8' })
}


init()

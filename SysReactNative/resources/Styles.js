import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    largeText: {
        color: '#808080',
        textAlign: "center", 
        fontSize: 34,
        margin: 30,
    },
    smallText: {
        color: '#000',
        fontSize: 16,
        textAlign: "center"
    },
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        color: '#000',
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#00ca00', 
        borderWidth: 1,

        borderRadius:100,
    },
    buttonText: {
        padding: 7,
        fontSize: 18,
        fontWeight: "bold",
        color: '#00ca00'
    },
    listItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'rgb(249, 232, 62)',
    },
    error: {
        textAlign: "center", 
        margin: 30,
        fontSize: 24,
        color: 'rgb(255, 0, 0)',
    },
})

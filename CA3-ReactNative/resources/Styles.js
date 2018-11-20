import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    largeText: {
        color: 'white',
        textAlign: "center", 
        fontSize: 34,
        margin: 30,
    },
    smallText: {
        color: 'white',
        fontSize: 16,
        textAlign: "center"
    },
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    button: {
        color: 'white',
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#000',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 3,

        shadowColor: 'rgb(255, 0, 0)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 25,
    },
    buttonText: {
        padding: 7,
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
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

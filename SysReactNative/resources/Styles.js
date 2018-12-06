import { StyleSheet } from 'react-native';

export const COLORS = {
    MAIN: '#00ca00',
    WHITE: '#ffffff',
    BLACK: '#000000',
    GREY: '#808080',
    ERR: '#ff0000'
}

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

        borderRadius: 100,
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
    
    /***********/
    
    flightPriceContainer: {
        backgroundColor: COLORS.WHITE,
        borderTopColor: COLORS.MAIN, 
        borderTopWidth: 2 
    },

    flightPrice: {
        color: COLORS.MAIN, 
        fontSize: 32, 
        textAlign: 'center', 
        padding: 5,
        margin: 25
    },
    
    textFilter: {
        color: COLORS.MAIN, 
        fontSize: 24, 
        height: 40, 
        borderColor: 'transparent', 
        marginLeft: 25, 
        marginRight: 25
    },
    
    sliderFilter: {
        marginLeft: 25, 
        marginRight: 25
    },
    
    filterLabel: {
        color: COLORS.GREY, 
        fontWeight: 'bold',
        margin: 15
    },
    
    resetFilters: {
        textAlign: 'center', 
        color: COLORS.MAIN, 
        fontSize: 18, 
        padding: 5
    },

    flightCardContainer: {
        padding: 10, 
        margin: 15, 
        borderBottomColor: COLORS.GREY, 
        borderBottomWidth: 1 
    },

    flightCardTitle: {
        color: COLORS.GREY, 
        fontSize: 16, 
        textAlign: 'center', 
        padding: 5,
    },

    flightCardSubTitle: {
        color: COLORS.BLACK, 
        fontSize: 14, 
        textAlign: 'center', 
        padding: 5,
        fontWeight: 'bold',
        paddingBottom: 10
    },

    flightCardLabel: {
        color: COLORS.GREY, 
        fontSize: 14
    },

    flightCardContent: {
        color: COLORS.BLACK, 
        fontSize: 16, 
        fontWeight: 'bold', 
        padding: 5,
        marginBottom: 10
    },

    flightCardPrice: {
        fontSize: 18, 
        textAlign: 'center', 
        color: COLORS.MAIN, 
        fontWeight: 'bold', 
        margin: 15
    },
    
    error: {
        textAlign: "center",
        margin: 30,
        fontSize: 24,
        color: COLORS.ERR,
    },
    
    textInput: {
        textAlign: 'center',
        color: COLORS.MAIN,
        fontSize: 18,
        padding: 5
    }
})

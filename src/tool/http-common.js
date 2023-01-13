import axios from "axios";

const instance=axios.create({
    //baseURL:'http://mindjobcarddemo-env.eba-jmh4xtc3.us-east-1.elasticbeanstalk.com/system',
    baseURL: 'http://localhost:8080/system',

    // baseURL: '/api/system',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    }
});

function getAuthorization () {
    let Author = sessionStorage.getItem('Authorization')
    if (Author === null) return ''
    return Author
}

instance.interceptors.request.use(
    (config) => {
        config.headers.authorization = getAuthorization()
        return config
    }
)

export default instance
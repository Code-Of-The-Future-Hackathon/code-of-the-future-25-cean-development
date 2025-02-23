#include <bits/stdc++.h>
using namespace std;

double N;

void speed()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

double calculate_part_size_circle(double r, double len)
{
    double theta = len / r;
    theta *= (double)(1000); theta = (round)(theta); theta /= (double)(1000);
    cout << "theta: " << (theta * (double)(180)) / (double)(M_PI) << endl;
    double area = ((r * r) / (double)(2)) * (theta - sin(theta));
    return area;
}

double size_circle()
{
    double r, len;
    cout << "radios: " << endl;
    cin >> r ;
    cout << endl ;

    cout << "length: " << endl;
    cin >> len ;
    cout << endl ;

    double sz = calculate_part_size_circle(r, len);
    sz = (round)(sz);
    cout << "size of the partial circle: " << sz << " mm^2" << endl ;
    return sz;
}

double size_body()
{
    cout << "Measurements from the front part" << endl ;
    double full_size = 0;
    full_size += size_circle();

    cout << "------------------------------------------------------------" << endl << endl ;
    cout << "Measurements from the back part" << endl ;
    full_size += size_circle();

    cout << "------------------------------------------------------------" << endl << endl ;
    cout << "Measurements from the side parts" << endl ;
    full_size += ((double)(2) * size_circle());

    double n, m;
    cout << "------------------------------------------------------------" << endl << endl ;
    cout << "Measurements of the rectangular" << endl ;
    cout << "n: " << endl;
    cin >> n ;
    cout << endl ;
    cout << "m: " << endl;
    cin >> m ;
    cout << endl << endl ;

    cout << "Full size: " << endl;
    full_size += (n * m);
    cout << full_size << " mm^2" << endl << endl;
    N = n;
    return full_size;
}

void solve()
{
    cout << "All the measurements are in milimeters :)" << endl ;
    double s1 = size_body();
    double n1;
    cout << "n of the smaller rectangular inside: " << endl;
    cin >> n1 ;
    cout << endl << endl ;
    double k = N / n1; /// coeficient of similarity
    double s2 = s1 / (k * k);
    s2 = (round)(s2);
    cout << "S2: " << s2 << " mm^2" << endl;
    double s = s1 - s2;

    cout << "Overall size: " ;
    cout << fixed;
    cout << setprecision(2);
    cout << s ;
    cout << " mm^2" << endl << endl;

    double h;
    cout << "Height: " << endl;
    cin >> h ;
    double volume = s1 * h ;
    volume /= (double)(1000000000);
    cout << setprecision(10);
    cout << "Volume " << volume << " m^3" << endl;
    cout << setprecision(3);
    double buoyancy = volume * (double)(9.81) * (double)(1000);
    cout << "buoyancy " << buoyancy << "N, " << (buoyancy / (double)(10.2)) << "kg" << endl << endl;

    volume = s * h ;
    volume /= (double)(1000000000);
    cout << setprecision(10);
    cout << "Volume (ring): " << volume << " m^3" << endl;
    cout << setprecision(3);
    buoyancy = volume * (double)(9.81) * (double)(1000);
    cout << "buoyancy (ring): " << buoyancy << "N, " << (buoyancy / (double)(10.2)) << "kg" << endl;
}

int main()
{
    speed();
    solve();
    return 0;
}

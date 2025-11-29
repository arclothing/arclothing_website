import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Globe, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">About AR Fashions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Leading B2B fashion supplier providing premium bulk clothing to retailers, wholesalers, and businesses worldwide.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2015, AR Fashions has been a trusted partner for businesses looking for high-quality bulk clothing. We started with a simple mission: to provide premium fashion products at competitive wholesale prices.
            </p>
            <p className="text-muted-foreground mb-4">
              Over the years, we've grown to serve thousands of retailers and wholesalers across the globe. Our commitment to quality, reliability, and customer service has made us a leader in the B2B fashion industry.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to innovate and expand our product range to meet the evolving needs of our customers.
            </p>
          </div>
          <div className="bg-secondary/10 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground mb-6">Years of Excellence</p>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-accent">5000+</div>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <p className="text-sm text-muted-foreground">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-primary-foreground" size={24} />
                </div>
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We maintain the highest standards in fabric selection and manufacturing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-primary-foreground" size={24} />
                </div>
                <CardTitle>Customer Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your satisfaction is our top priority in every interaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Globe className="text-primary-foreground" size={24} />
                </div>
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Serving customers worldwide with reliable shipping and support</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-primary-foreground" size={24} />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Continuously improving our products and services</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-secondary/10 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our dedicated team of fashion experts, quality controllers, and customer service professionals work tirelessly to ensure your satisfaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Sales Team", "Quality Control", "Logistics"].map((dept) => (
              <div key={dept}>
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-center text-sm">{dept}</span>
                </div>
                <p className="font-semibold">{dept}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;



